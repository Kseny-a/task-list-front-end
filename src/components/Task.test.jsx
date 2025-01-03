import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Task from './Task';

describe('Task', () => {
  test('Renders title content', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onTaskClickCallback={() => { }}
        onTaskDeleteCallback={() => { }}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  test('Runs callbacks when buttons clicked', () => {
    // Arrange
    const clickCallback = vi.fn();
    const deleteCallback = vi.fn();

    // Act
    render(
      <Task
        id={42}
        title={'Test Title'}
        isComplete={true}
        onTaskClickCallback={clickCallback}
        onTaskDeleteCallback={deleteCallback}
      />
    );

    screen.getByText('Test Title').click();
    screen.getByText('x').click();

    // Assert
    expect(clickCallback).toHaveBeenCalledTimes(1);
    expect(deleteCallback).toHaveBeenCalledTimes(1);
    // Check parameters passed to callbacks
    expect(clickCallback).toHaveBeenCalledWith(42);
    expect(deleteCallback).toHaveBeenCalledWith(42);
  });

  test('Task has class "tasks__item__toggle--completed" if done is true', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={true}
        onTaskClickCallback={() => { }}
        onTaskDeleteCallback={() => { }}
      />
    );

    expect(screen.getByText('Test Title')).toHaveClass(
      'tasks__item__toggle--completed'
    );
  });

  test('Task does not have class "tasks__item__toggle--completed" if done is false', () => {
    // Act
    render(
      <Task
        id={1}
        title={'Test Title'}
        isComplete={false}
        onTaskClickCallback={() => { }}
        onTaskDeleteCallback={() => { }}
      />
    );

    // Assert
    expect(screen.getByText('Test Title')).not.toHaveClass(
      'tasks__item__toggle--completed'
    );
  });
});
