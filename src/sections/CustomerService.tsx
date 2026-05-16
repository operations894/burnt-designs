import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Phone, Mail, Sparkles } from 'lucide-react'

const SQUARE_STORE = 'https://shop.burnt-designs.com'

const quickReplies = [
  'What wood types do you offer?',
  'How long does a custom table take?',
  'Do you deliver?',
  'What are your prices?',
  'Tell me about epoxy options',
  'How do I place a custom order?',
]

const botResponses: Record<string, string> = {
  'What wood types do you offer?':
    '\ud83e\udeb5 We work with **Walnut, Oak, Cedar, Maple, Pine, and Cherry**. Each has unique grain patterns. Walnut & Oak are our most popular for dining tables. Cedar is great for outdoor signs!',
  'How long does a custom table take?':
    '\u23f1\ufe0f Typical turnaround:\n\u2022 Dining tables: 4-6 weeks\n\u2022 Coffee/end tables: 2-4 weeks\n\u2022 Entry signs: 1-2 weeks\n\u2022 Art pieces: 1-3 weeks\n\nRush orders available for an additional 25% fee.',
  'Do you deliver?':
    '\ud83d\ude9b Yes! We deliver within Missouri and surrounding states. Local pickup is free at our Garden City shop. Delivery fees depend on distance \u2014 usually $50-200.',
  'What are your prices?':
    '\ud83d\udcb0 Starting prices:\n\u2022 End tables: $325+\n\u2022 Coffee tables: $650+\n\u2022 Dining tables: $1,800+\n\u2022 Signs: $125+\n\u2022 Cutting boards: $75+\n\nUse our **AI Price Estimator** in the order form for instant quotes!',
  'Tell me about epoxy options':
    '\u2728 We offer several epoxy styles:\n\u2022 **River fill** \u2014 stunning center channel\n\u2022 **Edge pour** \u2014 flowing border accents\n\u2022 **Full coat** \u2014 glossy protective finish\n\u2022 **Inlay channels** \u2014 decorative lines\n\u2022 **Knot/void fill** \u2014 natural look\n\nColors: Blue, Teal, Black Smoke, Amber, Deep Red, Emerald, and Clear.',
  'How do I place a custom order?':
    `\ud83d\udccb Easy! You have two options:\n1. Use our **Custom Order Form** on this page \u2014 includes a live preview and AI pricing\n2. Visit our **Square Store** at ${SQUARE_STORE}\n\nScroll down to the order section or click "Custom Order" in the nav!`,
}

function getAIResponse(text: string): string {
  const lower = text.toLowerCase()
  if (lower.includes('wood') || lower.includes('walnut') || lower.includes('oak') || lower.includes('cedar'))
    return botResponses['What wood types do you offer?']
  if (lower.includes('how long') || lower.includes('timeline') || lower.includes('turnaround') || lower.includes('rush'))
    return botResponses['How long does a custom table take?']
  if (lower.includes('deliver') || lower.includes('ship') || lower.includes('pickup'))
    return botResponses['Do you deliver?']
  if (lower.includes('price') || lower.includes('cost') || lower.includes('how much') || lower.includes('$$'))
    return botResponses['What are your prices?']
  if (lower.includes('epoxy') || lower.includes('resin') || lower.includes('river'))
    return botResponses['Tell me about epoxy options']
  if (lower.includes('order') || lower.includes('custom') || lower.includes('buy') || lower.includes('purchase'))
    return botResponses['How do I place a custom order?']
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey'))
    return "\ud83d\udc4b Hey there! Welcome to GW Burnt Designs. I'm here to help you with wood types, pricing, epoxy options, or anything else. What can I help you with?"
  if (lower.includes('thank'))
    return "You're welcome! \ud83d\udd25 If you need anything else, just ask. You can also call us at (816) 680-2467 or email operations@burntdesigns.com."
  if (lower.includes('sign') || lower.includes('driveway') || lower.includes('entry'))
    return "\ud83e\udea7 Our entry signs start at $125+ and are hand-burned on live-edge cedar or walnut. Perfect for ranch entrances, family names, farm lanes, and cabins. Use the previewer above to test your text and font!"
  if (lower.includes('table'))
    return "\ud83e\udeb5 We make dining, coffee, and end tables in Natural Edge, Modern Edge, and Decorative Edge styles. Prices range from $325 for end tables to $2,800+ for large dining tables. Check out the gallery above!"

  return "\ud83e\udd14 Great question! I'm still learning, but our team can help you directly. You can:\n\n\ud83d\udcde Call: (816) 680-2467\n\ud83d\udce7 Email: operations@burntdesigns.com\n\nOr use the **Custom Order Form** below for instant AI pricing on your project!"
}

interface Message { text: string; from: 'user' | 'bot' }

export default function CustomerService() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hey! \ud83d\udc4b I'm the Burnt Designs AI assistant. I can help with wood types, pricing, epoxy options, delivery, and custom orders. What would you like to know?", from: 'bot' },
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages(prev => [...prev, { text, from: 'user' }])
    setInput('')
    setIsTyping(true)

    const reply = botResponses[text] || getAIResponse(text)
    const delay = 400 + Math.random() * 600
    setTimeout(() => {
      setIsTyping(false)
      setMessages(prev => [...prev, { text: reply, from: 'bot' }])
    }, delay)
  }

  return (
    <>
      {/* Chat Bubble */}
      {!open && (
        <button onClick={() => setOpen(true)} className="chat-bubble group" aria-label="AI Chat Assistant">
          <MessageCircle size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: '#f0b35b' }}>
            <Sparkles size={10} style={{ color: '#1e1309' }} />
          </span>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-[200] w-[380px] max-w-[calc(100vw-2rem)] rounded-3xl overflow-hidden"
          style={{ boxShadow: '0 24px 80px rgba(31,18,8,0.35)' }}>
          {/* Header */}
          <div className="px-5 py-4 flex items-center justify-between" style={{ background: 'linear-gradient(135deg, #3a1f0d, #8b4c1c)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full flex items-center justify-center relative" style={{ background: '#f0b35b', color: '#1e1309' }}>
                <Sparkles size={16} />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2" style={{ background: '#22c55e', borderColor: '#3a1f0d' }} />
              </div>
              <div>
                <p className="font-inter font-black text-sm" style={{ color: '#fff7ea' }}>Burnt Designs AI</p>
                <p className="text-[11px] font-medium" style={{ color: 'rgba(255,247,234,0.6)' }}>Online \u2014 Powered by AI \u2728</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg transition-colors hover:bg-white/10" style={{ color: '#fff7ea' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[340px] overflow-y-auto p-4 space-y-3" style={{ background: '#fff7ea' }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed font-medium`} style={{
                  background: msg.from === 'user' ? 'linear-gradient(135deg, #3a1f0d, #8b4c1c)' : 'rgba(58,31,13,0.08)',
                  color: msg.from === 'user' ? '#fff7ea' : '#1e1309',
                  borderBottomRightRadius: msg.from === 'user' ? 4 : 16,
                  borderBottomLeftRadius: msg.from === 'user' ? 16 : 4,
                  whiteSpace: 'pre-line',
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: 'rgba(58,31,13,0.08)', borderBottomLeftRadius: 4 }}>
                  <span className="flex gap-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#7b6752', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#7b6752', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#7b6752', animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}

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
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 flex items-center gap-2" style={{ background: '#fff0d4', borderTop: '1px solid rgba(58,31,13,0.08)' }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask about wood, pricing, epoxy..."
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
            <a href={SQUARE_STORE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[11px] font-bold" style={{ color: '#7b6752' }}>
              <Sparkles size={12} /> Shop
            </a>
          </div>
        </div>
      )}
    </>
  )
}
