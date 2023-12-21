import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTask, deleteTask } from '/@/GlobalStates/tasksSlice';
import './ToDo.css';
import { Icon } from '@iconify/react';
import DropDownIcon from "/@/components/DropDownIcon/DropDownIcon";

const ToDo = ({ title, list }) => {
    const selectedTasks = useSelector((state) => state.tasks.selectedTasks);
    const dispatch = useDispatch();

    const handleToggle = (taskId) => {
        dispatch(toggleTask(taskId));
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId));
    };

    return (
        <div className="todowrapper col-span-12 rounded-sm py-6 px-7 shadow-default dark:bg-compdark xl:col-span-7">
            <h2 className="mb-3 flex justify-content-start text-xl font-semibold dark:text-white">{title}</h2>
            {list.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    checked={selectedTasks.includes(task.id)}
                    onToggle={() => handleToggle(task.id)}
                    onDelete={() => handleDelete(task.id)}
                />
            ))}
        </div>
    );
};

const TaskItem = ({ task, checked, onToggle, onDelete }) => {
    const textStyle = checked ? 'line-through' : '';
    const textColor = checked ? 'text-gray' : 'dark:text-gray';

    const dropdownOptions = [
        {
            text: 'Edit',
            onClick: onDelete,
            icon: <Icon icon="mi:edit" width="24" />
        },
        {
            text: 'Mark as Completed',
            onClick: onDelete,
            icon: <Icon icon="material-symbols:check" width="24" />
        },
        {
            text: 'Delete',
            onClick: onDelete,
            icon: <Icon icon="mdi:rubbish" color="red" width="24" />
        },
    ];

    return (
        <div className="taskItem border-b border-dashed flex items-center justify-between py-3
         dark:border-gray dark:border-dashed">
            <div className="flex items-center">
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={checked}
                    onChange={onToggle}
                />
                <p className={`taskText ml-2 ${textStyle} ${textColor}`}>{task.name}</p>
            </div>
            <DropDownIcon
            icon={<Icon icon="ant-design:more-outlined" width="24" className="dark:text-white" />}
            options={dropdownOptions}
            />
        </div>
    );
};

export default ToDo;