$.ajax('/add', {
  method: 'GET',
  success: successHandler,
  error: errorHandler
});

function successHandler(data) {
  console.log('SUCCESS', data);
};

function errorHandler(error) {
  console.log('ERROR', error);
};
