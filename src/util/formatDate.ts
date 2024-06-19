const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(date);

  return new Date(formattedDate);
};

export default formatTime;
