import { useState } from 'react'
import { MessageCircle, X, Send, Phone, Mail } from 'lucide-react'

const quickReplies = [
  'What wood types do you offer?',
  'How long does a custom table take?',
  'Do you deliver?',
  'What are your prices?',
]

const botResponses: Record<string, string> = {
  'What wood types do you offer?':
    'We work with Walnut, Oak, Cedar, Maple, Pine, and Cherry. Each has its own unique grain pattern and color. Walnut and Oak are our most popular choices for dining tables.',
  'How long does a custom table take?':
    'Typical turnaround is 2-4 weeks depending on complexity. Dining tables with full scenes can take 4-6 weeks. Entry signs are usually 1-2 weeks. Rush orders available for an additional fee.',
  'Do you deliver?':
    'Yes! We deliver within Missouri and surrounding states. Delivery fees depend on distance. We also offer free local pickup at our Garden City shop.',
  'What are your prices?':
    'End tables start at $325+, coffee tables at $650+, dining tables at $1,800+, and driveway signs at $125+. Final pricing depends on wood type, size, complexity of burn design, and epoxy work.',
}

interface Message { text: string; from: 'user' | 'bot' }

export default function CustomerService() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hey there! Welcome to GW Burnt Designs. How can I help you today?', from: 'bot' },
  ])
  const [input, setInput] = useState('')

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { text, from: 'user' }])
    setInput('')

    const reply = botResponses[text]
    setTimeout(() => {
      if (reply) {
        setMessages(prev => [...prev, { text: reply, from: 'bot' }])
      } else {
        setMessages(prev => [...prev, {
          text: "Thanks for reaching out! I'll connect you with our team. You can also call (816) 680-2467 or email operations@burntdesigns.com for faster response.",
          from: 'bot'
        }])
      }
    }, 600)
  }

  return (
    <>
      {/* Chat Bubble */}
      {!open && (
        <button onClick={() => setOpen(true)} className="chat-bubble" aria-label="Chat">
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[200] w-[360px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(31,18,8,0.35)' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #3a1f0d, #8b4c1c)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center font-rye text-xs" style={{ background: '#f0b35b', color: '#1e1309' }}>GW</div>
              <div>
                <p className="font-inter font-black text-sm" style={{ color: '#fff7ea' }}>GW Burnt Designs</p>
                <p className="text-[11px] font-medium" style={{ color: 'rgba(255,247,234,0.6)' }}>Online &mdash; Replies within 24hrs</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg transition-colors hover:bg-white/10" style={{ color: '#fff7ea' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[320px] overflow-y-auto p-4 space-y-3" style={{ background: '#fff7ea' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.from === 'user'
                    ? 'font-medium'
                    : 'font-medium'
                }`} style={{
                  background: msg.from === 'user' ? 'linear-gradient(135deg, #3a1f0d, #8b4c1c)' : 'rgba(58,31,13,0.08)',
                  color: msg.from === 'user' ? '#fff7ea' : '#1e1309',
                  borderBottomRightRadius: msg.from === 'user' ? 4 : 16,
                  borderBottomLeftRadius: msg.from === 'user' ? 16 : 4,
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Quick Replies */}
            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {quickReplies.map(q => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:brightness-110"
                    style={{ background: 'rgba(240,179,91,0.15)', color: '#5c3214', border: '1px solid rgba(240,179,91,0.3)' }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 flex items-center gap-2" style={{ background: '#fff0d4', borderTop: '1px solid rgba(58,31,13,0.08)' }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2.5 text-sm outline-none"
              style={{ background: 'white', border: '1px solid rgba(58,31,13,0.12)', color: '#1e1309' }} />
            <button onClick={() => sendMessage(input)}
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all hover:brightness-110"
              style={{ background: 'linear-gradient(135deg, #3a1f0d, #8b4c1c)', color: '#fff7ea' }}>
              <Send size={16} />
            </button>
          </div>

          {/* Contact shortcut */}
          <div className="px-4 py-2 flex items-center justify-center gap-4" style={{ background: '#fff0d4' }}>
            <a href="tel:8166802467" className="flex items-center gap-1 text-[11px] font-bold" style={{ color: '#7b6752' }}>
              <Phone size={12} /> Call
            </a>
            <a href="mailto:operations@burntdesigns.com" className="flex items-center gap-1 text-[11px] font-bold" style={{ color: '#7b6752' }}>
              <Mail size={12} /> Email
            </a>
          </div>
        </div>
      )}
    </>
  )
}