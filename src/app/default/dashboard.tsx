import { useEffect, useRef } from 'react';
import { Tab } from '@headlessui/react';
import { Chart, registerables } from 'chart.js';
import Card from '../../components/Card';
import Button from '../../components/Button';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  

  // Sample cards data
  const statsCards = [
    { title: 'Total Users', value: '2,453', change: '+12%' },
    { title: 'Active Sessions', value: '378', change: '+5%' },
    { title: 'Revenue', value: '$12,380', change: '+18%' },
    { title: 'Conversion', value: '3.2%', change: '-0.4%' },
  ];

  // Sample recent activity
  const recentActivity = [
    { user: 'Sophia Chen', action: 'Placed an order', time: '10 minutes ago' },
    { user: 'Marcus King', action: 'Updated profile', time: '1 hour ago' },
    { user: 'Ava Williams', action: 'Added payment method', time: '2 hours ago' },
    { user: 'Noah Thompson', action: 'Created account', time: '3 hours ago' },
  ];

  // Initialize chart when component mounts
  useEffect(() => {
    const performanceData = [
      { name: 'Jan', value: 62 },
      { name: 'Feb', value: 85 },
      { name: 'Mar', value: 73 },
      { name: 'Apr', value: 91 },
      { name: 'May', value: 105 },
      { name: 'Jun', value: 87 },
    ];

    if (chartRef.current) {
      // Destroy existing chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      // Create gradient for bar background
      const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
      gradient?.addColorStop(0, 'rgba(102, 126, 234, 0.6)');
      gradient?.addColorStop(1, 'rgba(102, 126, 234, 0.1)');
      
      chartInstance.current = new Chart(ctx!, {
        type: 'bar',
        data: {
          labels: performanceData.map(item => item.name),
          datasets: [{
            label: 'Performance',
            data: performanceData.map(item => item.value),
            backgroundColor: gradient,
            borderColor: 'rgba(102, 126, 234, 1)',
            borderWidth: 1,
            borderRadius: 4,
            barThickness: 20,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'rgba(255, 255, 255, 0.8)',
              bodyColor: 'rgba(255, 255, 255, 0.8)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 4,
              displayColors: false
            }
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)'
              }
            },
            y: {
              grid: {
                color: 'rgba(255, 255, 255, 0.05)',
              },
              ticks: {
                color: 'rgba(255, 255, 255, 0.6)'
              }
            }
          }
        }
      });
    }
  }, []);
  
  return (
    <>
      {/* Navigation Tabs */}
      <Tab.Group>
        <Tab.List className="flex gap-4 mb-6 border-b border-white/10 text-[var(--text-color)]">
          {['Overview', 'Analytics', 'Reports', 'Settings'].map((tab) => (
            <Tab 
              key={tab}
              className={({ selected }) =>
                `pb-2 px-1 text-sm outline-none ${
                  selected
                    ? 'border-b-2 border-indigo-500 text-indigo-400' 
                    : ''
                }`
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsCards.map((card) => (
                <Card key={card.title}>
                  <p className="text-white/60 text-sm">{card.title}</p>
                  <div className="flex items-end justify-between mt-2">
                    <p className="text-2xl font-bold">{card.value}</p>
                    <span className={`text-sm ${
                      card.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {card.change}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Chart Section */}
              <Card 
                title="Monthly Performance" 
                className="lg:col-span-2"
              >
                <div className="h-64 relative">
                  <canvas ref={chartRef}></canvas>
                </div>
              </Card>

              {/* Activity Section */}
              <Card title="Recent Activity" >  
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="border-b border-white/10 pb-3 last:border-0">
                      <p className="font-medium">{activity.user}</p>
                      <p className="text-sm text-white/60">{activity.action}</p>
                      <p className="text-xs text-white/40 mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions Section */}
            <Card title="Quick Actions" className="mt-6">
              <div className="flex flex-wrap gap-3">
                {[
                  'Add New User', 
                  'Create Report', 
                  'Update Settings', 
                  'View Analytics'
                ].map((action) => (
                  <Button key={action} >
                    {action}
                  </Button>
                ))}
              </div>
            </Card>
          </Tab.Panel>
          
          {/* Other Tab Panels */}
          <Tab.Panel>
            <Card className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3">Analytics Dashboard</h3>
              <p className="text-white/60">Detailed analytics will appear here.</p>
            </Card>
          </Tab.Panel>
          <Tab.Panel>
            <Card className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3">Reports Dashboard</h3>
              <p className="text-white/60">Your reports will appear here.</p>
            </Card>
          </Tab.Panel>
          <Tab.Panel>
            <Card className="p-8 text-center">
              <h3 className="text-xl font-medium mb-3">Settings Dashboard</h3>
              <p className="text-white/60">Configure your settings here.</p>
            </Card>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </>
  );
};

export default Dashboard;