import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { MoreVertical } from "lucide-react";
import { message } from "antd";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedAction, setSelectedAction] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskData, setTaskData] = useState({
    taskName: "",
    description: "",
    dueDate: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditTaskId(null);
    setTaskData({ taskName: "", description: "", dueDate: "" });
  };

  const tasksPerPage = 3;
  // get tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      const response = await axios.get("https://lemon-pay-assignment.vercel.app/tasks/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSaveTask = async () => {
    try {
      const token = localStorage.getItem("token");

      if (isEditMode) {
        // Update existing task
        await axios.patch(
          `https://lemon-pay-assignment.vercel.app/tasks/update/${editTaskId}`,
          taskData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        message.success("Task updated successfully!");
      } else {
        // Add new task
        await axios.post("https://lemon-pay-assignment.vercel.app/tasks/add", taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });

        message.success("Task added successfully!");
      }

      closeModal();
      fetchTasks();
    } catch (error) {
      console.error("Error saving task:", error);
      message.error("Failed to save task. Please try again!");
    }
  };

  const handleInputChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const totalPages = Math.ceil(tasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const displayedTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const toggleDropdown = (taskId) => {
    setOpenDropdown(openDropdown === taskId ? null : taskId);
  };

  const handleActionClick = async (taskId, action, task = null) => {
    setSelectedAction((prev) => ({
      ...prev,
      [taskId]: prev[taskId] === action ? null : action,
    }));

    if (action === "edit") {
      setIsEditMode(true);
      setEditTaskId(taskId);
      setTaskData({
        taskName: task.taskName,
        description: task.description,
        dueDate: task.dueDate.slice(0, 16), // Format for datetime-local input
      });
      setIsModalOpen(true);
    }

    if (action === "delete") {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`https://lemon-pay-assignment.vercel.app/tasks/delete/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        message.success("Task deleted successfully!");
        fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
        message.error("Failed to delete task. Please try again!");
      }
    }

    setOpenDropdown(null);
  };

  return (
    <TaskManage>
      <Text>Tasks Management</Text>
      <AddTaskButton onClick={openModal}>+ Add Task</AddTaskButton>

      <Table>
        <thead>
          <tr>
            <Th>No</Th>
            <Th>Date & Time</Th>
            <Th>Task</Th>
            <Th>Description</Th>
            <Th>Action</Th>
          </tr>
        </thead>
        <tbody>
          {displayedTasks.length > 0 ? (
            displayedTasks.map((task, index) => (
              <TaskRow key={task._id}>
                <Td>{startIndex + index + 1}</Td>
                <Td>{new Date(task.dueDate).toLocaleString()}</Td>
                <Td>{task.taskName}</Td>
                <Td>{task.description || "No description"}</Td>
                <Td>
                  <ActionWrapper>
                    <MoreVerticalIcon
                      onClick={() => toggleDropdown(task._id)}
                    />
                    {openDropdown === task._id && (
                      <DropdownMenu>
                        <DropdownItem
                          onClick={() =>
                            handleActionClick(task._id, "edit", task)
                          }
                        >
                          {selectedAction[task._id] === "edit" ? "✓ " : ""}Edit
                        </DropdownItem>

                        <DropdownItem
                          onClick={() => handleActionClick(task._id, "delete")}
                        >
                          {selectedAction[task._id] === "delete" ? "✓ " : ""}
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    )}
                  </ActionWrapper>
                </Td>
              </TaskRow>
            ))
          ) : (
            <TaskRow>
              <Td colSpan="5">No tasks available</Td>
            </TaskRow>
          )}
        </tbody>
      </Table>

      {/* Mobile View */}
      {displayedTasks.length > 0 ? (
        displayedTasks.map((task) => (
          <MobileTaskCard key={task._id}>
            <TaskHeader>
              <TaskDetails>
                <TaskTitle>{task.taskName}</TaskTitle>
                <TaskDescription>
                  {task.description || "No description"}
                </TaskDescription>
                <TaskDate>{new Date(task.dueDate).toLocaleString()}</TaskDate>
              </TaskDetails>

              <MoreIconWrapper>
                <MoreVerticalIcon onClick={() => toggleDropdown(task._id)} />
                {openDropdown === task._id && (
                  <DropdownMenu_1>
                    <DropdownItem_1
                      onClick={() => handleActionClick(task._id, "edit", task)}
                    >
                      {selectedAction[task._id] === "edit" ? "✓ " : ""}Edit
                    </DropdownItem_1>

                    <DropdownItem_1
                      onClick={() => handleActionClick(task._id, "delete")}
                    >
                      {selectedAction[task._id] === "delete" ? "✓ " : ""}Delete
                    </DropdownItem_1>
                  </DropdownMenu_1>
                )}
              </MoreIconWrapper>
            </TaskHeader>
          </MobileTaskCard>
        ))
      ) : (
        <p>No tasks available</p>
      )}

      {totalPages > 1 && (
        <Pagination>
          <PageButton onClick={handlePrev} disabled={currentPage === 1}>
            {"<"}
          </PageButton>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PageButton>
          ))}
          <PageButton
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            {">"}
          </PageButton>
        </Pagination>
      )}

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>
            <Form>
              <Input
                type="text"
                placeholder="Enter Task Name"
                name="taskName"
                value={taskData.taskName}
                onChange={handleInputChange}
                required
              />

              <Input
                type="text"
                placeholder="Description"
                name="description"
                value={taskData.description}
                onChange={handleInputChange}
              />

              <Input
                type="datetime-local"
                placeholder="Date Picker"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleInputChange}
                required
              />

              <ButtonWrapper>
                <SaveButton onClick={handleSaveTask}>
                  {isEditMode ? "Update" : "Save"}
                </SaveButton>
                <CancelButton onClick={closeModal}>Cancel</CancelButton>
              </ButtonWrapper>
            </Form>
          </ModalContent>
        </ModalOverlay>
      )}
    </TaskManage>
  );
};

// Styled Components
const TaskManage = styled.div`
  padding: 30px;
  display: flex;
  flex-direction: column;
  max-width: 1462px;
  margin: auto;
`;

const Text = styled.h1`
  color: #1e3ba3;
  font-family: "Nunito", sans-serif;
  font-weight: 700;
  font-size: 36px;
  text-align: left;
  margin-bottom: 20px;
`;

const AddTaskButton = styled.button`
  width: 209px;
  height: 50px;
  border-radius: 25px;
  background: #1e3ba3;
  border: none;
  color: #ffffff;
  font-family: Nunito, sans-serif;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  align-self: flex-end;
  margin-bottom: 20px;
  transition: 0.3s ease-in-out;

  &:hover {
    background: #142974;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;

  @media (max-width: 768px) {
    display: none; /* Hide table on mobile */
  }
`;

// for mobile
const MobileTaskCard = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    position: relative; /* Enables absolute positioning inside */
  }
`;

const TaskHeader = styled.div`
  display: flex;
  justify-content: space-between; /* Aligns left and right */
  align-items: center;
`;

const TaskDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoreIconWrapper = styled.div`
  position: relative; /* Ensures dropdown is positioned relative to this */
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const DropdownMenu_1 = styled.div`
  position: absolute;
  top: 100%; /* Moves the dropdown below the triple-dot */
  right: 0;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 120px;
  padding: 5px 0;
  z-index: 10;
`;

const DropdownItem_1 = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
  }
`;

const TaskTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #1e3ba3;
  margin-bottom: 5px;
`;

const TaskDescription = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const TaskDate = styled.p`
  font-size: 14px;
  color: #777;
  font-style: italic;
`;

const Th = styled.th`
  color: #1e3ba3;
  background-color: #f2f2f2;
  font-family: Nunito, sans-serif;
  font-weight: 700;
  font-size: 18px;
  text-align: left;
  padding: 12px;
`;

const Td = styled.td`
  padding: 15px;
  text-align: left;
  font-size: 16px;
  font-family: Nunito, sans-serif;
  color: #333;
`;

const TaskRow = styled.tr`
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  height: 107px;
`;

const ActionWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const MoreVerticalIcon = styled(MoreVertical)`
  cursor: pointer;
  color: #4c4c4c;
  &:hover {
    color: #142974;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 7px;
  left: 32px;
  width: 75px;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  z-index: 100;
`;

const DropdownItem = styled.div`
  cursor: pointer;
  font-size: 14px;
  color: #333;
  padding: 5px;
  transition: 0.3s;

  &:hover {
    background: #f2f2f2;
    color: #1e3ba3;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
  font-family: Nunito, sans-serif;
  background: ${(props) => (props.isActive ? "#1e3ba3" : "#ccc")};
  color: ${(props) => (props.isActive ? "#fff" : "#666")};
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #d9d9d975;
  width: 262px;
  height: 46px;
  text-align: center;
`;

const SaveButton = styled.button`
  background: #1e3ba3;
  color: white;
  width: 85px;
  height: 47px;
  padding: 21px 27px;
  padding-bottom: 34px;
  padding-left: 20px;
  gap: 10px;
  border-radius: 43px;
  border: none;
`;

const CancelButton = styled.button`
  background: #ffff;
  width: 98px;
  height: 47px;
  padding: 21px 27px;
  gap: 10px;
  border: none;
`;

export default TaskManagement;
