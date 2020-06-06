const TOPICS = [
    {id:0, title:'Main', subtopics:[], route:'/home', breadcrumbs: [0]},
    {id:1, title:'Topic Tasks', subtopics:[7,8], route: '/topictasks/:id', breadcrumbs: [0, 1]},
    {id:2, title:'Materials', subtopics:[], route: '/materials', breadcrumbs: [0, 2]},
    {id:3, title:'Variants', subtopics:[], route: '/variants', breadcrumbs: [0, 3]},
    {id:4, title:'Rating', subtopics:[], route: '/rating', breadcrumbs: [0, 4]},
    {id:5, title:'Progress', subtopics:[], route: '/progress', breadcrumbs: [0, 5]},
    {id:6, title:'Learn Words', subtopics:[], route: '/learnwords', breadcrumbs: [0, 6]},
    {id:7, title:'Quantitative Reasoning', subtopics:[9, 10, 11, 12, 13, 14, 15, 16, 17], route: '/topictasks', breadcrumbs: [0, 1, 7]},
    {id:8, title:'Verbal Reasoning', subtopics:[], route: './topictasks', breadcrumbs: [0, 1, 8]},
    {id:9, title:'Algebra', subtopics:[11, 12, 13, 14, 15], breadcrumbs: [0, 1, 7 ,9]},
    {id:10, title:'Number properties', subtopics:[], breadcrumbs: [0, 1, 7, 10]},
    {id:11, title:'Statistics', subtopics:[], breadcrumbs: [0, 1, 7, 11]},
    {id:12, title:'Data Interpritation', subtopics:[], breadcrumbs: [0, 1, 7, 12]},
    {id:13, title:'Advanced Quant', subtopics:[], breadcrumbs: [0, 1, 7, 13]},
    {id:14, title:'Word Problems', subtopics:[], breadcrumbs: [0, 1, 7, 14]},
    {id:15, title:'Two-variable Word', subtopics:[], breadcrumbs: [0, 1, 7, 15]},
    {id:16, title:'Geometry', subtopics:[], breadcrumbs: [0, 1, 7, 16]},
    {id:17, title:'Mixed Review', subtopics:[], breadcrumbs: [0, 1, 7, 17]},
    {id:18, title:'Algebra', subtopics:[], breadcrumbs: [0, 1, 7, 9, 18]},
    {id:19, title:'Inequalities and Absolute Values', subtopics:[], breadcrumbs: [0, 1, 7, 9, 19]},
    {id:20, title:'Fuctions, Formulas and Sequences', subtopics:[], breadcrumbs: [0, 1, 7, 9, 20]},
    {id:21, title:'Variables in-the-choices problems', subtopics:[], breadcrumbs: [0, 1, 7, 9, 21]},
    {id:22, title:'Rates and Work', subtopics:[], breadcrumbs: [0, 1, 7, 9, 22]}
];

export default TOPICS;