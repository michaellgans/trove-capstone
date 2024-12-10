import React from 'react';
import lessonsData from '@/components/Lessons/LessonsData';
import TitleSection from '@/components/Lessons/TitleSection';
import KeywordsSection from '@/components/Lessons/KeywordsSection';
import RealWorldSection from '@/components/Lessons/RealWorldSection';
import ExamplesSection from '@/components/Lessons/ExamplesSection';
import QuizSection from '@/components/Lessons/QuizSection';
import ConclusionSection from '@/components/Lessons/ConclusionSection';
import ResourcesSection from '@/components/Lessons/ResourcesSection';

type LessonPageProps = {
  params: {
    id: string;
  }
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = lessonsData.find((lesson) => lesson.id === params.id);

  if (!lesson) {
    return <div className="text-center text-red-500">Lesson not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <TitleSection lessonName={lesson.majorTitle} />
      <KeywordsSection keywords={lesson.keywords} />
      <RealWorldSection
        descriptiveText={lesson.descriptiveText}
        keywords={lesson.keywords}
      />
      <ExamplesSection
        example={lesson.example}
        mathEquations={lesson.mathEquations || []}
        imageSrc="/images/equations.png"
        imageAlt="Examples illustration"
        keywords={lesson.keywords}
      />
      <QuizSection quiz={lesson.quiz} />
      <ConclusionSection conclusion={lesson.conclusion} />
      <ResourcesSection resources={lesson.resources} />
    </div>
  );
}
