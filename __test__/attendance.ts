import prisma from "../client";
interface Attendance {
  id: number;
  date: Date;
  presentStatus: boolean;
  userId: number
}
export const addAttendance = async (attendance:Attendance) => {
    try {
      const addAttendance = await prisma.attendance.create({
        data: attendance
      });
      return addAttendance;
    } catch (error) {
      return error;
    }
  };
  export const updateAttendance = async (attendance : Attendance) => {
    try {
        const  id  = attendance.id;
    
        let updateAttendance = await prisma.attendance.update({
          where: {
            id: Number(id),
          },
          data: {
            presentStatus: attendance.presentStatus,
            userId: attendance.userId,
          },
        });
        return updateAttendance
      } catch (error) {
        return error
      }
}