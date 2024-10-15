import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Navigation, Info } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
        <div className="min-h-screen bg-black text-white flex flex-col">
          <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6" />
                <span className="text-xl font-bold">Journey Link</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-gray-400">Home</a>
                <a href="#" className="hover:text-gray-400">About</a>
                <a href="#" className="hover:text-gray-400">Contact</a>
                <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={() => navigate('/login')} >Login</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500" onClick={() => navigate('/register')} >Register</button>
              </div>
            </div>
          </nav>
    
          <main className="container mx-auto mt-8 px-4">
            <h1 className="text-4xl font-bold mb-6 text-center">Real-Time Location Sharing Made Easy</h1>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Users className="mr-2" /> Join a Room
                </h2>
                <p className="mb-4">
                  Connect with your group by entering a unique Room ID. Share your location and see others in real-time on the map.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500" onClick={()=>navigate('/roomCreate')}>
                  Create or Join Room
                </button>
              </div>
    
              <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4 flex items-center">
                  <Navigation className="mr-2" /> Get Directions
                </h2>
                <p className="mb-4">
                  Need to meet up? Get turn-by-turn directions to any group member's location with just a click.
                </p>
                <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500" onClick={()=>navigate('/map/demoMap')}>
                  View Demo Map
                </button>
              </div>
            </div>
    
            <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <Info className="mr-2" /> How It Works
              </h2>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a room or join an existing one using a unique Room ID.</li>
                <li>Allow the app to access your location when prompted.</li>
                <li>See your group members' locations update in real-time on the map.</li>
                <li>Click on any user to get directions to their location.</li>
                <li>Stay connected and coordinate easily for your group activities!</li>
              </ol>
            </div>
          </main>
    
          <footer className="bg-gray-800 mt-12 py-4">
            <div className="container mx-auto text-center text-gray-400">
              &copy; 2024 LocationShare. All rights reserved.
            </div>
          </footer>
        </div>
  );
};

export default Dashboard;
