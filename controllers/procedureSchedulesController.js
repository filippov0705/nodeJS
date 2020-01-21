const procedureService = require("@services/procedureService");
const {ERROR} = require("@constants/constants");

const usersFile = "./mockData/mockData.json";

class ProcedureSchedulesController {
    getProcedureSchedules(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const user = procedureService
                .getFileFromDB(usersFile)
                .find(item => item.userId === Number(userId));
            const procedure = user.data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(procedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    deleteSchedule(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const { id } = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.schedule = procedure.schedule.filter(schedule => schedule.id !== id);
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(userId))
                .data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    postNewSchedule(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const newSchedule = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.schedule = [...procedure.schedule, newSchedule];
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(userId))
                .data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }

    editSchedule(req, res) {
        try {
            const { userId, procedureId } = req.params;
            const newSchedule = req.body;
            const newUserFile = procedureService.getFileFromDB(usersFile).map(item => {
                if (item.userId === Number(userId)) {
                    item.data.map(procedure => {
                        if (procedure.id === Number(procedureId)) {
                            procedure.schedule = procedure.schedule.map(schedule => {
                                if (schedule.id === newSchedule.id) {
                                    schedule = newSchedule;
                                }
                                return schedule;
                            });
                        }
                        return procedure;
                    });
                }
                return item;
            });

            procedureService.setFileToDB(usersFile, newUserFile);
            const newProcedure = newUserFile
                .find(item => item.userId === Number(userId))
                .data.find(item => item.id === Number(procedureId));
            res.status(200).send(JSON.stringify(newProcedure));
        } catch (e) {
            res.status(400).send(JSON.stringify({message: ERROR}));
        }
    }
}

module.exports = new ProcedureSchedulesController();