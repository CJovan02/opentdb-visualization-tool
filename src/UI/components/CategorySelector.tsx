import type {Category} from "../../models/category.ts";
import InputLabel from "@mui/material/InputLabel";
import Select, {type SelectChangeEvent} from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

type CategorySelectorProps = {
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (categoryId: number) => void;
}

function CategorySelector(
    {onSelectCategory, selectedCategory, categories}: CategorySelectorProps
) {
    function handleChange(
        event: SelectChangeEvent<number>,
    ) {
        onSelectCategory(event.target.value);
    }

    return (
        <FormControl fullWidth>
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
                id="category-select"
                labelId="category-select-label"
                label="Category"
                value={selectedCategory?.id ?? ''}
                onChange={handleChange}
                //autoWidth={false}
                sx={{
                    minWidth: '5rem',
                }}
            >
                {categories.map(cat => (
                    <MenuItem
                        key={cat.id}
                        value={cat.id}
                    >
                        {cat.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default CategorySelector;