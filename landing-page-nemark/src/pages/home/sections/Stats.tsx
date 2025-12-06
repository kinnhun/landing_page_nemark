import React, { useEffect, useState } from 'react'
import Counter from '@/components/Counter'
import { StaggerContainer, StaggerItem } from '@/components/Reveal'
import { getStatsSettings } from '@/services/statsApi'
import { StatItem } from '@/types/stats'

const Stats = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { label: 'Khách Hàng Tin Dùng', value: 232 },
    { label: 'Dự Án Hoàn Thành', value: 521 },
    { label: 'Giờ Hỗ Trợ Kỹ Thuật', value: 1453 },
    { label: 'Thành Viên Đội Ngũ', value: 32 }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStatsSettings();
        if (data && data.stats) {
          setStats(data.stats);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();

    // Listen for updates
    const channel = new BroadcastChannel('app-settings');
    channel.onmessage = (event) => {
      if (event.data.type === 'stats-updated' && event.data.data) {
        setStats(event.data.data.stats);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  return (
    <section id="stats" className="py-16 bg-gray-50 scroll-mt-20">
      <div className="container mx-auto px-4">
        
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {stats.map((stat, index) => (
            <StaggerItem key={index} className="text-center w-full h-full p-8 bg-white shadow-sm rounded-lg hover:-translate-y-2 transition-transform duration-300 border border-gray-100">
              <div className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-teal-500">
                <Counter end={stat.value} />
              </div>
              <p className="text-gray-600 font-semibold m-0">{stat.label}</p>
            </StaggerItem>
          ))}

        </StaggerContainer>

      </div>
    </section>
  )
}

export default Stats
