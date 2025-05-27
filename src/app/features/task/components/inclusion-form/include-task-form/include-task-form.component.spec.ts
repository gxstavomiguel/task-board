import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IncludeTaskFormComponent } from './include-task-form.component';
import { CategoryService } from '../../../../category/service/category.service';
import { TaskService } from '../../../services/task.service';
import { SnackBarService } from '../../../../../shared/services/snack-bar.service';
import { Observable, of } from 'rxjs';
import { Task } from '../../../model/task.model';
import { task } from '../../../../../_mock_/task';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('IncludeTaskFormComponent', () => {
  let component: IncludeTaskFormComponent;
  let fixture: ComponentFixture<IncludeTaskFormComponent>;
  let categoryService: CategoryService;
  let taskService: TaskService;
  let snackBarService: SnackBarService;

  const MOCKED_TASK = task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IncludeTaskFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IncludeTaskFormComponent);

    categoryService = TestBed.inject(CategoryService);
    taskService = TestBed.inject(TaskService);
    snackBarService = TestBed.inject(SnackBarService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('creates a component', () => {
    expect(component).toBeTruthy();
  });

  //Todos os testes envolvendo renderização
  describe('visibility', () => {
    it('render initial newTaskForm state value', () => {
      const newTaskForm = component.newTaskForm;
      expect(newTaskForm.controls.title.value).toEqual('');
      expect(newTaskForm.controls.categoryId.value).toEqual('1');
    });
  });

  it('render initial newTaskForm label values', () => {
    const titleLabel = fixture.debugElement.query(
      By.css('[data-testid="titleLabel"]')
    );

    const categoryLabel = fixture.debugElement.query(
      By.css('[data-testid="categoryIdLabel"]')
    );

    expect(titleLabel.nativeElement.textContent).toContain('Tarefa');
    expect(categoryLabel.nativeElement.textContent).toContain('Categoria');
  });

  it('should call selectionChangeHandler when mat-select dispatch selectionChange event', () => {
    const categoryId = '3';

    const event = { value: categoryId };

    const selectionChangeHandlerSpy = jest
      .spyOn(component, 'selectionChangeHandler')
      .mockImplementation(() => {});
    fixture.debugElement
      .query(By.css('mat-select'))
      .triggerEventHandler('selectionChange', event);

    expect(selectionChangeHandlerSpy).toHaveBeenCalledWith(event);
  });

  it('should call showSnackBar when snackBarConfigHandler is called with a message', () => {
    const message = 'Tarefa incluída';

    const showSnackBar = jest
      .spyOn(snackBarService, 'showSnackBar')
      .mockImplementation(() => {});

    component.snackBarConfigHandler(message);
    expect(showSnackBar).toHaveBeenCalledWith(message, 3000, 'end', 'bottom');
  });

  it('should enable/disabler newTaskForm and set isIncludeTaskFormDisabled when taskService.isLoadingTask toggle', () => {
    const newTaskForm = component.newTaskForm;

    taskService.isLoadingTask.set(true);
    expect(component.isIncludeTaskFormDisabled()).toBeTruthy();
    expect(newTaskForm.disabled).toBeTruthy();

    taskService.isLoadingTask.set(false);
    expect(component.isIncludeTaskFormDisabled()).toBeFalsy();
    expect(newTaskForm.disabled).toBeFalsy();
  });

  describe('onEnterToAddTask', () => {
    it('should do nothing when newTaskForm is invalid', () => {
      component.onEnterToAddATask();

      const createTaskSpy = jest
        .spyOn(taskService, 'createTask')
        .mockReturnValue(of(MOCKED_TASK));

        expect(createTaskSpy).not.toHaveBeenCalled();
        expect(component.isIncludeTaskFormDisabled()).toBeFalsy();
    });

    it('should call createTask and insertATasksInTheList, snackBarConfigHandler and update isLoadingTask value', fakeAsync(() => {
        component.newTaskForm.controls.title.setValue(MOCKED_TASK.title)
        component.newTaskForm.controls.categoryId.setValue(MOCKED_TASK.categoryId)

        const createTaskSpy = jest
        .spyOn(taskService, 'createTask')
        .mockReturnValue(of(MOCKED_TASK));

        const insertATaskInTheTasksListSpy = jest
        .spyOn(taskService, 'insertATaskInTheTasksList')
        .mockImplementation(() => {});

        const snackBarConfigHandler = jest
        .spyOn(component, 'snackBarConfigHandler')
        .mockImplementation(() => {});

        component.onEnterToAddATask();

        tick(3000);

        expect(createTaskSpy).toHaveBeenCalled();
        expect(insertATaskInTheTasksListSpy).toHaveBeenCalledWith(MOCKED_TASK);
        expect(snackBarConfigHandler).toHaveBeenCalledWith('Tarefa incluída');
    }))

  });
});
