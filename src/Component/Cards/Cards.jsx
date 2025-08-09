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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-25 ">
      {cardData.map((card, idx) => (
        <div
          key={idx}
          className={`flex items-center p-6 rounded-xl shadow-md bg-[var(--color-beig)]`}
        >
          <div className="mr-6">{card.icon}</div>
          <div>
            <div className="text-[var(--color-green)] font-medium text-lg">
              {card.title}
            </div>
            <div className="text-[var(--color-gray)] font-bold text-2xl">{card.value}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
