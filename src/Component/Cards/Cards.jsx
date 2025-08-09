import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleIcon from '@mui/icons-material/People';

export default function Cards() {
  const Iconstyle = {
    fontSize: "40px",
    color: "var(--color-green)",
  };

  const cardData = [
    {
      title: "Total Projects",
      value: 12,
      icon: <AssignmentIcon style={Iconstyle} />,
    },
    {
      title: "Earnings",
      value: "$4,800",
      icon: <AttachMoneyIcon style={Iconstyle} />,
    },
    {
      title: "Tasks Due",
      value: 5,
      icon: <ListAltIcon style={Iconstyle} />,
    },
    {
      title: "Active Clients",
      value: 20,
      icon: <PeopleIcon style={Iconstyle} />,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 w-full p-5 mx-15">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className="flex items-center p-6 rounded-xl shadow-md bg-[var(--color-beig)] w-full md:w-60"
        >
          <div className="m-4 p-2 ">{card.icon}</div>
          <div>
            <div className="text-[var(--color-green)] font-medium text-lg max-h-64">
              {card.title}
            </div>
            <div className="text-[var(--color-gray)] font-bold text-2xl">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}