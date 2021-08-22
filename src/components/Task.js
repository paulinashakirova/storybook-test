import React from 'react';
import PropTypes from 'prop-types';

export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
	return (
		<div className={`list-item ${state}`}>
			<label className='checkbox'>
				<input
					type='checkbox'
					defaultChecked={state === 'TASK_ARCHIVED'}
					disabled={true}
					name='checked' />
				<span className='checkbox-custom' onClick={() => onArchiveTask(id)}/>
			</label>
			<div className='title'>
				<input type='text' value={title} readOnly={true} placeholder='Input title'
					style={{background: 'red'}}/>
			</div>

			<div className='actions' onClick={event => event.stopPropagation()}>
				{state !== 'TASK_ARCHIVED' && (
					<a onClick={() => onPinTask(id)}>
						<span className={`icon-star`} />
					</a>
				)}
			</div>
		</div>
	);
}

Task.propTypes = {
	// Composition of the task
	task: PropTypes.shape({
		//Id of the task
		id: PropTypes.string.isRequired,
		//Title of the task
		title: PropTypes.string.isRequired,
		//Current state of the task
		state: PropTypes.string.isRequired,
	}),
	//Event handler to archive a task
	onArchiveTask: PropTypes.func,
	//Event handler to pin a task
	onPinTask: PropTypes.func,
};
