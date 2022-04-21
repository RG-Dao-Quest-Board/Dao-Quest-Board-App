// quest must be an object of type
//  * {
//  *   dao: String,         The DAO name
//  *   quest_text: String,  The text to display for the quest
//  *   position_x: number,  The x position of the draggable component
//  *   position_y: number   The y position of the draggable component
//  * }
export interface questType {
    dao: string,
    quest_text: string,
    position_x: number,
    position_y: number
}