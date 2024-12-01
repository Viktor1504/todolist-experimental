import {ChangeEvent, useState, KeyboardEvent} from 'react';
import {TextField, Tooltip} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox"

type Props = {
    addItem: (title: string) => void;
}

export const AddItemForm = ({addItem}: Props) => {
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(event.currentTarget.value)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter") {
            addItemHandler()
        }
    }

    const addItemHandler = () => {
        if (title.trim() !== "") {
            addItem(title.trim())
            setTitle("")
        } else {
            setError("Title is required")
        }
    }

    return (
        <>
            <Tooltip title="Введите новое значение" arrow>
                <TextField
                    value={title}
                    onChange={changeItemHandler}
                    onKeyDown={handleKeyDown}
                    error={!!error}
                    helperText={error}
                    size="small"
                    autoFocus
                    variant="outlined"
                />
            </Tooltip>
            <IconButton onClick={addItemHandler} color={"primary"}>
                <AddBoxIcon/>
            </IconButton>
        </>

    );
}