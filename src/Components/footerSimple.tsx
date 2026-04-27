import { Gamepad2 } from "lucide-react";

export function FooterSimple() {
  return (
    <footer className="w-full border-t border-[#2A2C3B] bg-[#0B0C14] py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        
        {/* Logo + texto */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">
            Apoia<span className="text-primary">Ce</span>
          </span>
          <span className="text-xs text-muted-foreground">
            © 2024 ApoiaCe. Built on the Neon Nexus.
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs">
          <a href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Support Hub
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Brand Assets
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}