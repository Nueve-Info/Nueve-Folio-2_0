import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"
import { Section } from "@/components/ui/section"
import MentorAvatar from "@/assets/mentor-avatar.png"

export function MentorSection() {
  return (
    <Section id="mentor" className="bg-white py-20 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-surface-grey/30 p-8 shadow-sm md:p-12 lg:p-24"
      >
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />

        <div className="relative z-10 flex flex-col items-center justify-between gap-12 lg:flex-row lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-4 py-1.5 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-text-grey">Available Now</span>
            </div>

            <h2 className="text-nueve-black">
              Mentor available<br />
              <span className="text-brand-orange">24/7 to chat</span>
            </h2>
            
            <p className="mt-6 text-xl font-medium leading-relaxed text-text-grey">
              Get unstuck instantly. Whether it's a portfolio review, career advice, or technical help, expert guidance is just a message away.
            </p>


          </div>

          {/* Chat Interface Mockup */}
          <div className="w-full max-w-md shrink-0">
             <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-xl">
               <div className="space-y-4">
                 <div className="flex items-start gap-4">
                   <div className="h-10 w-10 rounded-full bg-surface-grey" />
                   <div className="rounded-2xl rounded-tl-none bg-surface-grey p-4">
                     <p className="text-sm text-text-grey">Can you check my case study structure?</p>
                   </div>
                 </div>
                 <div className="flex items-start justify-end gap-4">
                   <div className="rounded-2xl rounded-tr-none bg-brand-orange p-4">
                     <p className="text-sm font-medium text-white">Looking solid! Just move the problem statement higher.</p>
                   </div>
                  <div className="h-10 w-10 rounded-full bg-white block overflow-hidden">
                    <img src={MentorAvatar} alt="Mentor" loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </div>
                 </div>
               </div>
               
               <div className="mt-6 flex items-center gap-4 border-t border-black/5 pt-4">
                 <div className="h-10 flex-1 rounded-full bg-surface-grey" />
                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange">
                   <MessageSquare className="h-5 w-5 text-white" />
                 </div>
               </div>
             </div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}
