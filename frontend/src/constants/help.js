const TEXTS = {
  entities1: 'A volunteer adjusts the schedule board at Wikimania 2007. The board indicates the times and locations at which events will take place, thus assisting participants in deciding which events they can attend. A train schedule informs travelers of the trains going to various locations, and indicates the times of departure. Hours of operation posted at a FEMA office following a disaster inform the public of when FEMA employees will be available to assist them. A weekly work schedule indicates which employees of a business are going to work at which times, to ensure the effective distribution of labor resources. A schedule or a timetable, as a basic time-management tool, consists of a list of times at which possible tasks, events, or actions are intended to take place, or of a sequence of events in the chronological order in which such things are intended to take place. The process of creating a schedule - deciding how to order these tasks and how to commit resources between the variety of possible tasks - is called scheduling,[1][2] and a person responsible for making a particular schedule may be called a scheduler. Making and following schedules is an ancient human activity.',
  entities2: 'List of all available Classrooms with information about them. Capacity, available software',
  entities3: 'All subjects whose Courses are being held in the Computer Science Laboratories.',
  entities4: 'These are all the available programs and applications. Each can be assigned to one or multiple classrooms as an available software for that classroom, likewise it can be added to Subject as its dependency.',
  schedule1: 'kliknes tu tamo i to je to',
  schedule2: 'isto kao i ovo prethodno samo mnogo drugacije ali snaci ces se',
  navigation: `
    <code>ctrl 1</code> - go to course tab<br>
    <code>ctrl 2</code> - go to classroom tab<br>
    <code>ctrl 3</code> - go to subject tab<br>
    <code>ctrl 4</code> - go to software tab<br>`,
  actions: `
    <code>ctrl + enter</code> - submit current form<br>
    <code>F1</code> - open help dialog`,
  tutorial: 'Learn the basics with the interactive tutorial, just click the button bellow',
};

const TAB_VALUES = {
  '0': 'classroom',
  '1': 'subject',
  '2': 'course',
  '3': 'software',
};

export {
  TEXTS,
  TAB_VALUES,
};
