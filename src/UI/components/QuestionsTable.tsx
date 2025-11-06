import React, {useState} from "react";
import type {Question} from "../../models/question.ts";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from "@mui/material";

type QuestionsTableProps = {
    questions: Question[];
};

function QuestionsTable({questions}: QuestionsTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{width: "100%", overflow: "hidden", mt: '2rem'}}>
            <TableContainer sx={{maxHeight: 500}}>
                <Table stickyHeader aria-label="trivia questions table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Difficulty</TableCell>
                            <TableCell>Correct Answer</TableCell>
                            <TableCell>Incorrect Answers</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((q, index) => (
                                <TableRow key={index} hover>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{q.question}</TableCell>
                                    <TableCell>{q.category}</TableCell>
                                    <TableCell>{q.difficulty}</TableCell>
                                    <TableCell>{q.correct_answer}</TableCell>
                                    <TableCell>{q.incorrect_answers.join(", ")}</TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={questions.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default QuestionsTable;
