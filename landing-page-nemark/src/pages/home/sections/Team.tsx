import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image';
import { TwitterOutlined, FacebookOutlined, InstagramOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Reveal, StaggerContainer, StaggerItem } from '@/components/Reveal';
import { getTeamSettings } from '@/services/teamApi';
import type { TeamSettings, TeamMember } from '@/types/team';

const Team = () => {
  const [settings, setSettings] = useState<TeamSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTeamData = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getTeamSettings();
      setSettings(data);
    } catch (err) {
      console.error('Error fetching team settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTeamData();

    // Listen for team settings updates
    const handleUpdate = () => {
      fetchTeamData();
    };

    // Listen to localStorage event
    window.addEventListener('team_settings_updated', handleUpdate);

    // Listen to BroadcastChannel
    const channel = new BroadcastChannel('app_settings_channel');
    channel.addEventListener('message', (event) => {
      if (event.data === 'team-updated') {
        fetchTeamData();
      }
    });

    return () => {
      window.removeEventListener('team_settings_updated', handleUpdate);
      channel.close();
    };
  }, [fetchTeamData]);

  // Don't render if hidden or loading
  if (loading) {
    return (
      <section id="team" className="py-16 bg-white scroll-mt-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-gray-500">Đang tải...</div>
        </div>
      </section>
    );
  }

  if (!settings || settings.visible === false) {
    return null;
  }

  const members = (settings.members || []).filter(member => member.enabled !== false);

  // Get grid columns class
  const getGridCols = () => {
    const cols = settings.columns || 2;
    if (cols === 1) return 'grid-cols-1';
    return 'grid-cols-1 lg:grid-cols-2'; // default 2
  };

  // Handle image source - can be string URL or imported image
  const getImageSrc = (avatar: string): string => {
    if (typeof avatar === 'string') {
      return avatar;
    }
    if (typeof avatar === 'object' && avatar !== null && 'src' in avatar) {
      return (avatar as { src: string }).src;
    }
    return '';
  };

  return (
    <section id="team" className="py-16 bg-white scroll-mt-20">

      <div className="container mx-auto px-4 text-center mb-12 flex flex-col items-center">
        <Reveal direction="up">
          <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">{settings.title || 'Đội Ngũ Nemark'}</h2>
          {settings.description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {settings.description}
            </p>
          )}
        </Reveal>
      </div>

      <div className="container mx-auto px-4">
        {members.length > 0 ? (
          <StaggerContainer className={`grid ${getGridCols()} gap-8 items-stretch`}>
            {members.map((member: TeamMember) => {
              const imageSrc = getImageSrc(member.avatar);
              const social = member.social || {};
              
              return (
                <StaggerItem key={member.id} className="h-full">
                  <div className="bg-white shadow-sm rounded-lg p-6 flex flex-col sm:flex-row items-start gap-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full">
                    <div className="w-32 h-32 relative shrink-0 rounded-full overflow-hidden border-4 border-white shadow-md">
                      {imageSrc ? (
                        <Image 
                          src={imageSrc} 
                          alt={member.name} 
                          fill 
                          className="object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h4>
                      <span 
                        className="text-sm text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500 font-medium block mb-3"
                        style={member.positionColor ? { color: member.positionColor } : {}}
                      >
                        {member.position}
                      </span>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-1">
                        {member.bio}
                      </p>
                      <div className="flex gap-3">
                        {social.twitter && (
                          <a 
                            href={social.twitter} 
                            target={social.twitter.startsWith('#') ? undefined : '_blank'}
                            rel={social.twitter.startsWith('#') ? undefined : 'noopener noreferrer'}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <TwitterOutlined className="text-lg" />
                          </a>
                        )}
                        {social.facebook && (
                          <a 
                            href={social.facebook} 
                            target={social.facebook.startsWith('#') ? undefined : '_blank'}
                            rel={social.facebook.startsWith('#') ? undefined : 'noopener noreferrer'}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <FacebookOutlined className="text-lg" />
                          </a>
                        )}
                        {social.instagram && (
                          <a 
                            href={social.instagram} 
                            target={social.instagram.startsWith('#') ? undefined : '_blank'}
                            rel={social.instagram.startsWith('#') ? undefined : 'noopener noreferrer'}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <InstagramOutlined className="text-lg" />
                          </a>
                        )}
                        {social.linkedin && (
                          <a 
                            href={social.linkedin} 
                            target={social.linkedin.startsWith('#') ? undefined : '_blank'}
                            rel={social.linkedin.startsWith('#') ? undefined : 'noopener noreferrer'}
                            className="text-gray-400 hover:text-blue-500 transition-colors"
                          >
                            <LinkedinOutlined className="text-lg" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Chưa có thành viên nào để hiển thị
          </div>
        )}
      </div>

    </section>
  )
}

export default Team
