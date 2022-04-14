const getAllNotices = () => {
  return fetch('http://localhost:5001/')
    .then(response => {
      console.log('response', response);
      return response.json()
    })
    .then(data => data);
}

module.exports = { getAllNotices };