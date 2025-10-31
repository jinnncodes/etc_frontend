interface TopBarProps {
  name: string;
}

export default function TopBar({ name }: TopBarProps) {
  return (
    <div className="w-full flex justify-between items-center bg-gray-800 text-white px-6 py-3 shadow-md md:ml-0">
      <div className="text-xl font-bold">Dashboard</div>
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold">
          {name.charAt(0).toUpperCase()}
        </div>
        <span className="font-medium">{name}</span>
      </div>
    </div>
  );
}
