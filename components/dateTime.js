import { format, parseISO, isSameMonth } from 'date-fns';
import { fi } from 'date-fns/locale';

function formatDate(dateTime) {

	let day = "";
	let month = "";
	let year = "";
	let parsedDateTime=null;

	if( dateTime ){
		parsedDateTime = parseISO(dateTime);
		day = format(parsedDateTime, 'dd');
		month = format(parsedDateTime, 'MMMM', { locale: fi }); // Use 'MMMM' for the name of the month and specify the Finnish locale
		year = format(parsedDateTime, 'yyyy');
	}

	// Return the extracted values as an object
	return { dateTime, day, month, year, parsedDateTime };
}

function showMonthAndYear(startDate, endDate){
	if(typeof endDate !== 'object') {
		return true;
	}
	if( !isSameMonth(startDate.parsedDateTime, endDate.parsedDateTime)){
		return true;
	}
	return false;
}

const DateP = ({date, prefix, endDate}) => (
	<p
		className={`event-list__date event-list__${prefix}-date`}
		data-date={date.dateTime}
	>
		<span className="event-list__day">
			{date.day}
		</span>{" "}
		{showMonthAndYear(date, endDate) && (
			<>
				<span className="event-list__month">
					{date.month}
				</span>{" "}
				<span className="event-list__year">
					{date.year}
				</span>
			</>
		)}
	</p>
)

export default function DateView({startDate, endDate}) {

	const startDateValues = formatDate(startDate);
	const endDateValues = formatDate(endDate);
	return (
		<>
			<DateP date={startDateValues} prefix="start" endDate={endDateValues} />
			{endDate && (
				<>
				<div className="event-list__date-separator"></div>
				<DateP date={endDateValues} prefix="end" />
				</>
			)}
			{!endDate && (
				<p className="event-list__date event-list__end-date" data-date={""}>
				</p>
			)}
		</>
	)
}
