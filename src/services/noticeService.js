/**
 *
 * @returns {Promise<quest>}
 * See below for notice type
 */
const getAllQuests = () => {
  return fetch('http://localhost:5001/')
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

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

const deleteQuest = (id) => {
  return fetch(`http://localhost:5001/delete/quest/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
    mode: 'cors',
  })
    .then((response) => response.status)
    .then((data) => data)
    .catch((error) => error);
};

const applyToQuest = (id, applicant) => {
  return fetch(`http://localhost:5001/apply/quest/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(applicant),
  })
    .then((response) => response.status)
    .then((data) => data)
    .catch((error) => error);
};

module.exports = { createQuest, getAllQuests, deleteQuest, applyToQuest };
