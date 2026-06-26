import * as React from "react";
import { cn } from "@/lib/utils";

interface SocialLink {
  icon: React.ElementType;
  href: string;
}

interface TeamMember {
  name: string;
  designation: string;
  imageSrc: string;
  socialLinks?: SocialLink[];
}

interface TeamSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  members: TeamMember[];
}

export const TeamSection = React.forwardRef<HTMLDivElement, TeamSectionProps>(
  ({ members, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-margin-lg px-gutter-md relative w-full overflow-hidden bg-background",
          className
        )}
        {...props}
      >
        <div className="max-w-container-max mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-12 text-center">
            {/* Header Section */}
            <div className="text-center w-full">
              <span className="font-label-caps text-label-caps text-primary mb-2 block">TRADEIQ EXPERTS</span>
              <h2 className="font-headline-lg text-headline-lg text-primary mb-4">Meet Our Team</h2>
              <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            </div>

            {/* Team Members Grid */}
            <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 justify-center items-center">
              {members.slice(0, 2).map((member, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center justify-end overflow-hidden rounded-xl bg-surface-container-low p-6 text-center shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl border border-outline-variant/30 hover:border-primary/50 hover:bg-primary/5"
                >
                  {/* Background wave animation */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/2 origin-bottom scale-y-0 transform rounded-t-full bg-gradient-to-t from-primary/20 to-transparent transition-transform duration-500 ease-out group-hover:scale-y-100"
                    style={{ transitionDelay: `${index * 50}ms` }}
                  />

                  {/* Member Image with mask and border animation */}
                  <div
                    className="relative z-10 h-36 w-36 overflow-hidden rounded-full border-4 border-transparent bg-primary-container/10 transition-all duration-500 ease-out group-hover:border-primary/50 group-hover:scale-105"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={member.imageSrc}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  <h3 className="relative z-10 mt-6 font-headline-lg text-primary text-xl">
                    {member.name}
                  </h3>
                  <p className="relative z-10 font-body-sm text-secondary mt-1">
                    {member.designation}
                  </p>

                  {/* Social Links for individual members */}
                  {member.socialLinks && member.socialLinks.length > 0 && (
                    <div className="relative z-10 mt-5 flex gap-4 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                      {member.socialLinks.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-primary transition-colors bg-surface rounded-full p-2 border border-outline-variant/50"
                        >
                          <link.icon className="h-4 w-4" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
);

TeamSection.displayName = "TeamSection";
