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
            <div className="flex gap-2">
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600" onClick={() => navigate('/login')} >Login</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500" onClick={() => navigate('/register')} >Register</button>
            </div>
        </div>
      </nav>
      <header className="relative">
        <img
          src="https://img.freepik.com/premium-photo/photograph-group-friends-motorcycle-riders-riding-toghether-telephoto-lens-realistic-morning-light_983424-4230.jpg"
          alt="Group of friends on a road trip"
          className="w-full h-96 object-cover"
          style={{ opacity: '0.6' }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center px-4">
            Ride in Sync, No One Left Behind!
          </h1>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src="https://media.istockphoto.com/id/1421460958/photo/hand-of-young-woman-searching-location-in-map-online-on-smartphone.jpg?s=612x612&w=0&k=20&c=Kw8yHXSKmEhfjJVscY51Zob6IRjof0N2wmj2zp2-iRI="
              alt="People looking at a map on phone"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Join a Room
            </h2>
            <p className="mb-4">
              Join your group by entering a unique Room ID. Share live locations and track others on the map in real-time.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500" onClick={() => navigate('/roomCreate')}>
              Create or Join Room
            </button>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <img
              src="https://img.freepik.com/premium-photo/gps-navigation-app-smartphone-transforms-device-into-versatile-guide-providing-clear-directions-realtime-traffic-updates-intuitive-interface-generated-by-ai_661108-9497.jpg"
              alt="Navigation on smartphone"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Navigation className="mr-2" /> Get Directions
            </h2>
            <p className="mb-4">
              Need to gather? Get instant turn-by-turn directions to any group member’s spot with a single tap.
            </p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-500" onClick={() => navigate('/map/demoMap')}>
              View Demo Map
            </button>
          </div>
        </div>

        <div className="mt-12 bg-gray-800 p-6 rounded-lg shadow-md">
          <div className='flex flex-col md:flex-row gap-8 items-center justify-evenly'>
            <div className="flex items-center mb-6">
              <img
                src="https://media.istockphoto.com/id/1371958166/photo/teens-in-circle-holding-smart-mobile-phones-multicultural-young-people-using-cellphones.jpg?s=612x612&w=0&k=20&c=JcGUtyJaHrrbiOkPF3j_cmaBR5sNHXLxyXBqfClWH30="
                alt="Group of friends using smartphones"
                className="rounded-md"
              />
            </div>
            <div className="">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-500 justify-center">
                <Info className="mr-2" /> How It Works
              </h2>
              <ol className="list-decimal list-inside space-y-4">
                <li>Create a room or join an existing one using a unique Room ID.</li>
                <li>Allow the app to access your location when prompted.</li>
                <li>See your group members' locations update in real-time on the map.</li>
                <li>Click on any user to get directions to their location.</li>
                <li>Stay connected and coordinate easily for your group activities!</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 mt-12 py-4">
        <div className="container mx-auto text-center text-gray-400">
          &copy; 2024 journeylink. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
