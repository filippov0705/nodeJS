const xl = require("excel4node");

const {BOOLEAN, ERROR, STRING, SUCCESS, NUMBER, USER_DATA_STORAGE} = require("@constants/constants");

class CopyExcelService {
    copyExcel(task, data) {
        return new Promise(resolve => {
            try {
                const wb = new xl.Workbook();
                const ws = wb.addWorksheet(data[0].name);
                const style = wb.createStyle({
                    font: {
                        color: "#000000",
                        size: 9,
                    },
                    numberFormat: "###; (###); -",
                });

                data[0].data.forEach((item, row) => {
                    item.forEach((item, column) => {
                        return ws
                            .cell(row + 1, column + 1)
                            [typeof item](item)
                            .style(style);
                    });
                });
                wb.write(`${USER_DATA_STORAGE}${task.settings.to}.xlsx`);
                resolve({status: SUCCESS, runResult: data});
            } catch (e) {
                resolve({status: ERROR});
            }
        });
    }
}

module.exports = new CopyExcelService();