import { ModalWrapperComponent } from './components/modal-wrapper/modal-wrapper';
import { QuizSectionComponent } from './components/quiz-section/quiz-section';
import { PortfolioComponent } from './components/portfolio/portfolio';
import { CatalogComponent } from './components/catalog/catalog';
import { ReviewsComponent } from './components/reviews/reviews';
import { StagesComponent } from './components/stages/stages';
import { WhyUsComponent } from './components/why-us/why-us';
import { StatsComponent } from './components/stats/stats';
import { Component } from '@angular/core';
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { VideoReviewsComponent } from './components/video-reviews/video-reviews';
import { ShowroomComponent } from './components/showroom/showroom';
import { InstallmentComponent } from './components/installment/installment';
import { DesignerCallComponent } from './components/designer-call/designer-call';
import { FaqComponent } from './components/faq/faq';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    ModalWrapperComponent,
    StatsComponent,
    QuizSectionComponent,
    WhyUsComponent,
    CatalogComponent,
    PortfolioComponent,
    StagesComponent,
    ReviewsComponent,
    VideoReviewsComponent,
    ShowroomComponent,
    InstallmentComponent,
    DesignerCallComponent,
    FaqComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  // protected readonly title = signal('mebel-oldi-clone');
    title = 'mebel-oldi-clone';
}
