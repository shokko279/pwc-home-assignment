import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-task-detail-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-detail-component.html',
  styleUrl: './task-detail-component.css',
})
export class TaskDetailComponent {
  taskForm!: FormGroup;
  taskId!: string;

  constructor(
    private fb: FormBuilder,
    private tasksService: TaskService,
    private authService: AuthService,
    private route: ActivatedRoute,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.taskId = this.route.snapshot.paramMap.get('id')!;
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    });

    this.loadTask();
  }

  loadTask(): void {
    this.tasksService.getTask(this.taskId).subscribe({
      next: (task: Task) => {
        if (task.userId !== this.authService.getUserId()) {
          this.router.navigate(['/tasks']);
          alert('You are not allowed to access this task');
        } else {
          this.taskForm.patchValue(task);
        }
      },
      error: (err: any) => {
        console.error(err);
        this.router.navigate(['/tasks']); 
      },
    });
  }
  save(): void {
    if (this.taskForm.invalid) return;

    this.tasksService.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err: any) => console.error(err),
    });
  }
}
