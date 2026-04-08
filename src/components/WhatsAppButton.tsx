import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/243816029419"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[hsl(142,70%,45%)] text-[hsl(0,0%,100%)] flex items-center justify-center shadow-lg hover:scale-110 transition-transform animate-bounce"
    aria-label="WhatsApp"
    style={{ animationDuration: "2s", animationIterationCount: "infinite" }}
  >
    <MessageCircle className="h-7 w-7" />
  </a>
);

export default WhatsAppButton;
