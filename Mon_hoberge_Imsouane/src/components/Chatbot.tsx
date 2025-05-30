  import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  isBot: boolean;
}

const chatbotResponses = {
    greetings: [
      "Bonjour ! Je suis là pour vous aider à découvrir Mon Auberge. Que souhaitez-vous savoir ?",
      "Bienvenue à Mon Auberge ! Comment puis-je vous assister aujourd'hui ?",
      "Salut ! Je suis votre assistant virtuel. Je peux vous donner des informations sur les chambres, les activités, et bien plus.",
    ],
  
    auberge: "Mon Auberge est un hébergement chaleureux situé face à l'océan à Imsouane, Maroc. Nous offrons une expérience unique combinant confort moderne et charme traditionnel marocain. C'est l'endroit idéal pour se détendre et profiter de l'atmosphère sereine d'Imsouane.",
  
    location: "Mon Auberge se trouve à Imsouane, un charmant village de pêcheurs sur la côte atlantique du Maroc, à seulement 80 km au nord d'Agadir. Imsouane est connu pour ses plages magnifiques et ses spots de surf légendaires.",
  
    rooms: "Nous avons plusieurs types d'hébergement pour répondre à vos besoins :\n- Lits en dortoir (à partir de 20€/nuit) pour les voyageurs solo.\n- Chambres doubles (à partir de 60€/nuit) pour un séjour plus confortable.\n- Chambres familiales (à partir de 90€/nuit) parfaites pour les groupes ou les familles.",
  
    activities: "À Mon Auberge, nous proposons une large gamme d'activités pour tous les goûts :\n- Cours de surf pour débutants et confirmés.\n- Excursions en quad pour explorer la région.\n- Séances de yoga au coucher du soleil pour une relaxation optimale.\nEt bien plus encore !",
  
    booking: "Pour réserver votre séjour, vous pouvez soit remplir notre formulaire de réservation en ligne sur notre site, soit nous envoyer un email à reservations@monauberge.com. Nous sommes également disponibles par téléphone au +212 5 28 52 34 45 pour toute demande supplémentaire.",
  
    imsouane: "Imsouane est un village paisible situé sur la côte atlantique, réputé pour ses plages spectaculaires, ses spots de surf de classe mondiale et son ambiance détendue. C'est l'endroit parfait pour se ressourcer et profiter d'activités de plein air comme le surf, la randonnée ou simplement se détendre à la plage.",
  
    contact: "Pour toute question ou réservation, vous pouvez nous contacter par email à reservations@monauberge.com ou par téléphone au +212 5 28 52 34 45. Nous sommes également présents sur les réseaux sociaux pour vous tenir informé de nos dernières offres.",
  
    services: "À Mon Auberge, nous offrons divers services pour rendre votre séjour agréable :\n- Wi-Fi gratuit.\n- Transfert depuis et vers l'aéroport.\n- Restauration locale et internationale.\n- Location de planches de surf et de vélos.\n- Excursions organisées et bien plus.",
  
    weather: "Le climat à Imsouane est agréable tout au long de l'année. Les températures sont modérées, parfaites pour les activités en extérieur, comme le surf, la baignade et les balades au coucher du soleil. En été, il fait chaud et en hiver, il fait doux, idéal pour échapper aux températures rigoureuses d'autres régions.",

    surf: "Imsouane est célèbre pour ses vagues parfaites et ses spots de surf adaptés à tous les niveaux. Que vous soyez débutant ou surfeur expérimenté, vous trouverez des conditions idéales pour pratiquer` le surf. Nous proposons également des cours de surf avec des instructeurs qualifiés pour vous aider à progresser.",
};


const findResponse = (input: string): string => {
  const normalizedInput = input.toLowerCase();

  if (
    normalizedInput.includes('bonjour') ||
    normalizedInput.includes('salut') ||
    normalizedInput.includes('coucou') ||
    normalizedInput.includes('bonsoir') ||
    normalizedInput.includes('hello') ||
    normalizedInput.includes('hey')
  ) {
    return chatbotResponses.greetings[Math.floor(Math.random() * chatbotResponses.greetings.length)];
  }

  if (
    normalizedInput.includes('auberge') ||
    normalizedInput.includes('hôtel') ||
    normalizedInput.includes('hebergement') ||
    normalizedInput.includes('hébergement') ||
    normalizedInput.includes('hostel')
  ) {
    return chatbotResponses.auberge;
  }

  if (
    normalizedInput.includes('où') ||
    normalizedInput.includes('localisation') ||
    normalizedInput.includes('situé') ||
    normalizedInput.includes('adresse') ||
    normalizedInput.includes('trouve') ||
    normalizedInput.includes('emplacement') ||
    normalizedInput.includes('map')
  ) {
    return chatbotResponses.location;
  }

  if (
    normalizedInput.includes('chambre') ||
    normalizedInput.includes('dormir') ||
    normalizedInput.includes('lit') ||
    normalizedInput.includes('nuit') ||
    normalizedInput.includes('logement') ||
    normalizedInput.includes('réserver une chambre')||
    normalizedInput.includes('reserver une chambre')
  ) {
    return chatbotResponses.rooms;
  }

  if (
    normalizedInput.includes('activites') ||
    normalizedInput.includes('faire') ||
    normalizedInput.includes('surf') ||
    normalizedInput.includes('sortie') ||
    normalizedInput.includes('plage') ||
    normalizedInput.includes('excursion') ||
    normalizedInput.includes('détente') ||
    normalizedInput.includes('fun') ||
    normalizedInput.includes('loisirs')
  ) {
    return chatbotResponses.activities;
  }

  if (
    normalizedInput.includes('réserv') ||
    normalizedInput.includes('prix') ||
    normalizedInput.includes('tarif') ||
    normalizedInput.includes('payer') ||
    normalizedInput.includes('coût') ||
    normalizedInput.includes('disponibilité') ||
    normalizedInput.includes('dispo') ||
    normalizedInput.includes('frais')
  ) {
    return chatbotResponses.booking;
  }

  if (
    normalizedInput.includes('imsouane') ||
    normalizedInput.includes('village') ||
    normalizedInput.includes('maroc') ||
    normalizedInput.includes('région') ||
    normalizedInput.includes('region') ||
    normalizedInput.includes('localisation') ||
    normalizedInput.includes('endroit')
  ) {
    return chatbotResponses.imsouane;
  }

  return "Désolé, je n'ai pas compris votre question. Pouvez-vous reformuler ?";
};


const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ text: chatbotResponses.greetings[0], isBot: true }]);
    }
  }, [isOpen]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse = { text: findResponse(input), isBot: true };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
    
    setInput('');
  };
  
  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setIsMinimized(false);
    } else {
      setIsMinimized(!isMinimized);
    }
  };
  
  const closeChat = () => {
    setIsOpen(false);
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`bg-white rounded-lg shadow-lg mb-4 overflow-hidden ${
              isMinimized ? 'h-14' : 'w-80 sm:w-96'
            }`}
          >
            <div className="bg-green-600 text-white p-3 flex justify-between items-center">
              <span className="font-medium">Assistant Mon Auberge</span>
              <div className="flex gap-2">
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-green-700 rounded"
                  aria-label="Minimize chat"
                >
                  <ChevronDown size={20} />
                </button>
                <button
                  onClick={closeChat}
                  className="p-1 hover:bg-green-700 rounded"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {!isMinimized && (
              <>
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.isBot
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-green-600 text-white'
                        }`}
                      >
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
                
                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Posez votre question..."
                      className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="submit"
                      className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      <button
        onClick={toggleChat}
        className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        aria-label="Toggle chat"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default App;
