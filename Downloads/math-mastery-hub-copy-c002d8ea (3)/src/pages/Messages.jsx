import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Search, User, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { toast } from 'sonner';

export default function Messages() {
  const [user, setUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: () => base44.entities.User.list(),
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['messages', user?.email],
    queryFn: () => base44.entities.Message.filter({
      $or: [
        { sender_email: user?.email },
        { recipient_email: user?.email }
      ]
    }),
    enabled: !!user?.email,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (messageData) => {
      const threadId = [user.email, selectedUser.email].sort().join('_');
      await base44.entities.Message.create({
        ...messageData,
        thread_id: threadId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setNewMessage('');
      toast.success('Message sent!');
    },
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (messageId) => {
      await base44.entities.Message.update(messageId, { is_read: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
  });

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser) return;

    sendMessageMutation.mutate({
      sender_email: user.email,
      sender_name: user.full_name,
      recipient_email: selectedUser.email,
      recipient_name: selectedUser.full_name,
      content: newMessage.trim(),
    });
  };

  // Get unique conversations
  const conversations = allUsers
    .filter(u => u.email !== user?.email)
    .map(otherUser => {
      const threadMessages = messages.filter(m =>
        (m.sender_email === user?.email && m.recipient_email === otherUser.email) ||
        (m.sender_email === otherUser.email && m.recipient_email === user?.email)
      );
      const lastMessage = threadMessages.sort((a, b) => 
        new Date(b.created_date) - new Date(a.created_date)
      )[0];
      const unreadCount = threadMessages.filter(m => 
        m.recipient_email === user?.email && !m.is_read
      ).length;

      return {
        user: otherUser,
        lastMessage,
        unreadCount,
        messages: threadMessages,
      };
    })
    .filter(conv => 
      !searchQuery || 
      conv.user.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.created_date) - new Date(a.lastMessage.created_date);
    });

  const selectedConversation = selectedUser
    ? conversations.find(c => c.user.email === selectedUser.email)
    : null;

  useEffect(() => {
    if (selectedConversation) {
      selectedConversation.messages
        .filter(m => m.recipient_email === user?.email && !m.is_read)
        .forEach(m => markAsReadMutation.mutate(m.id));
    }
  }, [selectedConversation?.messages?.length]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <Button onClick={() => base44.auth.redirectToLogin(window.location.href)}>
          Sign In to Message
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
          <div className="grid md:grid-cols-3 h-[600px]">
            {/* Conversations List */}
            <div className={`md:col-span-1 border-r border-slate-100 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-4 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-violet-600" />
                  Messages
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="p-4 text-center text-slate-500 text-sm">
                    No conversations yet
                  </div>
                ) : (
                  conversations.map(({ user: otherUser, lastMessage, unreadCount }) => (
                    <button
                      key={otherUser.email}
                      onClick={() => setSelectedUser(otherUser)}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-slate-50 ${
                        selectedUser?.email === otherUser.email ? 'bg-violet-50' : ''
                      }`}
                    >
                      <Avatar>
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm">
                          {otherUser.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 text-left min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-slate-800 text-sm truncate">
                            {otherUser.full_name}
                          </p>
                          {unreadCount > 0 && (
                            <Badge className="bg-violet-600 text-white text-xs">
                              {unreadCount}
                            </Badge>
                          )}
                        </div>
                        {lastMessage && (
                          <p className="text-xs text-slate-500 truncate">
                            {lastMessage.sender_email === user.email ? 'You: ' : ''}
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`md:col-span-2 flex flex-col ${selectedUser ? 'flex' : 'hidden md:flex'}`}>
              {selectedUser ? (
                <>
                  <div className="p-4 border-b border-slate-100 flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedUser(null)}
                      className="md:hidden"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <Avatar>
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                        {selectedUser.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-800">{selectedUser.full_name}</p>
                      <p className="text-xs text-slate-500">{selectedUser.email}</p>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {selectedConversation?.messages
                      .sort((a, b) => new Date(a.created_date) - new Date(b.created_date))
                      .map((msg) => {
                        const isMe = msg.sender_email === user.email;
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                              isMe 
                                ? 'bg-gradient-to-r from-violet-600 to-purple-600 text-white' 
                                : 'bg-slate-100 text-slate-800'
                            }`}>
                              <p className="text-sm">{msg.content}</p>
                              <p className={`text-xs mt-1 ${isMe ? 'text-white/70' : 'text-slate-500'}`}>
                                {format(new Date(msg.created_date), 'HH:mm')}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                  </div>

                  <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100">
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="resize-none"
                        rows={2}
                      />
                      <Button
                        type="submit"
                        disabled={!newMessage.trim() || sendMessageMutation.isPending}
                        className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-slate-400">
                  <div className="text-center">
                    <MessageCircle className="w-16 h-16 mx-auto mb-3 opacity-50" />
                    <p>Select a conversation to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}