/**
 *
 * @returns {Promise<quest>}
 * See below for notice type
 */
const getAllQuests = () => {
  return fetch('http://localhost:5001/')
    .then(response => response.json())
    .then(data => data)
    .catch(error => error);
}

/**
 *
 * @param quest
 * quest must be an object of type
 * {
 *   dao: String,         The DAO name
 *   quest_text: String,  The text to display for the quest
 *   position_x: number,  The x position of the draggable component
 *   position_y: number   The y position of the draggable component
 * }
 * @returns {Promise<quest>}
 */
const createQuest = (quest) => {
  return fetch('http://localhost:5001/create/quest', {
    headers: { 'Content-Type': 'application/json' },
    mode: 'cors',
    method: 'POST',
    body: JSON.stringify(quest),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
};

module.exports = { createQuest, getAllQuests };
