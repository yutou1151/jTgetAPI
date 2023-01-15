  let timer = null;
  let current = 0;
  const getTimer = () => {
    return axios.get('https://api.moeu.moe/time').then(res => res.data)
  }

  const init = () => {
    getTimer().then(data => {
      timer = toUtc(data)
      renderBody(timer.format('YYMMMDD HHmmss').toUpperCase() + 'Z');
    })
  }
  
  const toUtc = ({
    location,
    timezone,
    timestamp,
  }) => moment.tz(timestamp * 1000, 
    `${location}`
  );

  const renderBody = (content) => Currenttime.innerHTML = content;

  const addTimer = (moment, num, company) => moment.add(num, company)

  const interval = setInterval(() => {
    if (current === 30) {
      current = 0;
      return init()
    }
    renderBody(addTimer(timer, 1, 's').format('YYMMMDD HHmmss').toUpperCase() + 'Z');
    current ++
  }, 1000)

  init();