
import {ListItem, List} from '@material-ui/core'

function Todo(props){

    return(
        <List>
            <ListItem key={props.data}>{props.data}</ListItem>
        </List>
    );
}

export default Todo;