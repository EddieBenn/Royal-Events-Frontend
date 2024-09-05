import Card from "../components/Cards";
import '../index.css'
import axios from '../configurations/httpSetup';
import { useEffect, useState } from "react";


function CardContainer({ filters }:any) {
const [events, setEvevnts] = useState<any[]>([]);

  const fetchData = async () => {
    try {
        const response = await axios.get('/events/upcoming_events');
        console.log(response.data.data)
       return setEvevnts(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
  fetchData();
}, [filters]);

const filteredEvents = events.filter(event => {
  return (
    (!filters.type || event.type === filters.type) &&
    (!filters.location || event.location === filters.location) &&
    (!filters.event_start_date || event.event_start_date === filters.event_start_date)
  );
});
  return (
    <>
    {filteredEvents.length !== 0 ? (
    <div className="flex flex-wrap justify-center items-center gap-8 mt-8">
       {filteredEvents.map((event, index) => (
        <div className="w-96 h-60 cursor-pointer card" key={index}>
          <Card
            image={event.dataValues.event_image}
            date={event.event_date} // Assuming event.date is in the correct format
            ticketsNo={event.dataValues.tickets_bought}
            title={event.dataValues.title}
            description={event.dataValues.description}
            id={event.dataValues.id}
          />
        </div>
      ))}
    </div>
    ): <p className="ml-[150px] mt-[30px]">No Upcoming Events Found</p>
  }
    </>
  );
}

export default CardContainer;
