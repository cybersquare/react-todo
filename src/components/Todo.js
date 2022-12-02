
import {ListItem, List, ListItemText} from '@material-ui/core'

function Todo(props){
    return(
        <List>
            <ListItem key={props.data.id}>
                <ListItemText primary="test"/>
            </ListItem>
        </List>
    );
}

export default Todo;