require('dotenv').config();
const mongoose = require('mongoose');
const Subject = require('../models/Subject');
const User = require('../models/User');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    await Subject.deleteMany({});
    await User.deleteMany({});

    console.log('🗑️  Cleared existing data');

    const demoUser = await User.create({
      name: 'Demo User',
      email: 'demo@neurobuddy.com',
      password: 'Demo123!',
      fieldOfStudy: 'Computer Science',
      streak: 5
    });

    console.log('✅ Demo user created');

    const subjects = [
      // Computer Science - 5 subjects
      {
        name: 'Data Structures & Algorithms',
        fieldOfStudy: 'Computer Science',
        description: 'Master fundamental data structures and algorithmic problem-solving',
        roadmap: [
          { phase: '1', title: 'Arrays & Strings', description: 'Basic data manipulation', duration: '2 weeks' },
          { phase: '2', title: 'Linked Lists & Stacks', description: 'Linear data structures', duration: '2 weeks' },
          { phase: '3', title: 'Trees & Graphs', description: 'Hierarchical structures', duration: '3 weeks' },
          { phase: '4', title: 'Dynamic Programming', description: 'Optimization techniques', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Introduction to Arrays', url: 'https://www.youtube.com/embed/QJNwK2uJyGs', duration: '15:30', description: 'Learn array basics and operations' },
          { title: 'Array Manipulation Techniques', url: 'https://www.youtube.com/embed/eXFSXemAzFQ', duration: '22:15', description: 'Advanced array operations' },
          { title: 'Two Pointer Technique', url: 'https://www.youtube.com/embed/On03HWe2tZM', duration: '18:45', description: 'Solve array problems efficiently' },
          { title: 'Linked List Fundamentals', url: 'https://www.youtube.com/embed/R9PTBwOzceo', duration: '20:45', description: 'Understanding linked lists' },
          { title: 'Doubly Linked Lists', url: 'https://www.youtube.com/embed/e9NG_a2Z0e8', duration: '17:30', description: 'Bidirectional linked lists' },
          { title: 'Binary Trees Explained', url: 'https://www.youtube.com/embed/oSWTXtMglKE', duration: '25:00', description: 'Tree data structures' },
          { title: 'Tree Traversals', url: 'https://www.youtube.com/embed/WLvU5EQVZqY', duration: '23:15', description: 'Inorder, Preorder, Postorder' },
          { title: 'Binary Search Trees', url: 'https://www.youtube.com/embed/pYT9F8_LFTM', duration: '28:30', description: 'BST operations and properties' },
          { title: 'Graph Representations', url: 'https://www.youtube.com/embed/tWVWeAqZ0WU', duration: '19:45', description: 'Adjacency matrix and list' },
          { title: 'BFS and DFS', url: 'https://www.youtube.com/embed/pcKY4hjDrxk', duration: '26:20', description: 'Graph traversal algorithms' },
          { title: 'Dynamic Programming Intro', url: 'https://www.youtube.com/embed/oBt53YbR9Kk', duration: '30:00', description: 'DP fundamentals' }
        ],
        quizzes: [
          {
            title: 'Arrays Basics Quiz',
            questions: [
              { question: 'What is the time complexity of accessing an array element?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 0 },
              { question: 'Which operation is fastest in an array?', options: ['Insertion', 'Deletion', 'Access', 'Search'], correctAnswer: 2 },
              { question: 'What is array indexing in most languages?', options: ['1-based', '0-based', 'Random', 'None'], correctAnswer: 1 },
              { question: 'What is the space complexity of an array?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 1 },
              { question: 'Which is NOT a valid array operation?', options: ['Insert', 'Delete', 'Traverse', 'Compile'], correctAnswer: 3 }
            ]
          },
          {
            title: 'Linked Lists Quiz',
            questions: [
              { question: 'What is the time complexity of inserting at the beginning of a linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 0 },
              { question: 'Which pointer is used in a singly linked list node?', options: ['Previous', 'Next', 'Both', 'None'], correctAnswer: 1 },
              { question: 'What is the advantage of linked lists over arrays?', options: ['Random access', 'Dynamic size', 'Cache friendly', 'Faster access'], correctAnswer: 1 },
              { question: 'What is a circular linked list?', options: ['List with no end', 'Last node points to first', 'List with cycles', 'Doubly linked'], correctAnswer: 1 },
              { question: 'Time complexity to search in linked list?', options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], correctAnswer: 1 }
            ]
          },
          {
            title: 'Trees and Graphs Quiz',
            questions: [
              { question: 'What is the height of a binary tree with one node?', options: ['0', '1', '2', 'Undefined'], correctAnswer: 0 },
              { question: 'Which traversal visits root first?', options: ['Inorder', 'Preorder', 'Postorder', 'Level order'], correctAnswer: 1 },
              { question: 'What is a complete binary tree?', options: ['All levels filled', 'All levels filled except last', 'Perfect tree', 'Balanced tree'], correctAnswer: 1 },
              { question: 'BFS uses which data structure?', options: ['Stack', 'Queue', 'Array', 'Tree'], correctAnswer: 1 },
              { question: 'DFS uses which data structure?', options: ['Stack', 'Queue', 'Array', 'Heap'], correctAnswer: 0 }
            ]
          }
        ],
        assignments: [
          { title: 'Implement Binary Search', description: 'Write a function to perform binary search', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Software Engineer', 'Backend Developer', 'Algorithm Engineer']
      },
      {
        name: 'Web Development',
        fieldOfStudy: 'Computer Science',
        description: 'Build modern web applications with React and Node.js',
        roadmap: [
          { phase: '1', title: 'HTML & CSS', description: 'Web fundamentals', duration: '2 weeks' },
          { phase: '2', title: 'JavaScript ES6+', description: 'Modern JavaScript', duration: '3 weeks' },
          { phase: '3', title: 'React.js', description: 'Frontend framework', duration: '4 weeks' },
          { phase: '4', title: 'Node.js & APIs', description: 'Backend development', duration: '4 weeks' }
        ],
        videos: [
          { title: 'HTML5 Essentials', url: 'https://www.youtube.com/embed/UB1O30fR-EE', duration: '18:20', description: 'HTML basics and semantic tags' },
          { title: 'HTML Forms and Input', url: 'https://www.youtube.com/embed/fNcJuPIZ2WE', duration: '16:45', description: 'Creating interactive forms' },
          { title: 'CSS Fundamentals', url: 'https://www.youtube.com/embed/yfoY53QXEnI', duration: '20:30', description: 'Styling basics' },
          { title: 'CSS Flexbox & Grid', url: 'https://www.youtube.com/embed/JJSoEo8JSnc', duration: '22:15', description: 'Modern CSS layouts' },
          { title: 'Responsive Design', url: 'https://www.youtube.com/embed/srvUrASNj0s', duration: '19:50', description: 'Mobile-first approach' },
          { title: 'JavaScript Basics', url: 'https://www.youtube.com/embed/W6NZfCO5SIk', duration: '25:00', description: 'Variables, functions, loops' },
          { title: 'JavaScript ES6+', url: 'https://www.youtube.com/embed/NCwa_xi0Uuc', duration: '28:15', description: 'Modern JavaScript features' },
          { title: 'Async JavaScript', url: 'https://www.youtube.com/embed/PoRJizFvM7s', duration: '24:40', description: 'Promises and async/await' },
          { title: 'React Hooks Deep Dive', url: 'https://www.youtube.com/embed/TNhaISOUy6Q', duration: '30:00', description: 'Master React hooks' },
          { title: 'React Router', url: 'https://www.youtube.com/embed/Law7wfdg_ls', duration: '21:30', description: 'Client-side routing' },
          { title: 'Node.js Fundamentals', url: 'https://www.youtube.com/embed/TlB_eWDSMt4', duration: '23:20', description: 'Server-side JavaScript' },
          { title: 'Express.js Framework', url: 'https://www.youtube.com/embed/L72fhGm1tfE', duration: '27:10', description: 'Building REST APIs' },
          { title: 'MongoDB Basics', url: 'https://www.youtube.com/embed/ofme2o29ngU', duration: '22:50', description: 'NoSQL database' }
        ],
        quizzes: [
          {
            title: 'JavaScript Fundamentals',
            questions: [
              { question: 'What is a closure in JavaScript?', options: ['A loop', 'A function with access to outer scope', 'An object', 'A class'], correctAnswer: 1 },
              { question: 'Which is NOT a JavaScript data type?', options: ['String', 'Boolean', 'Character', 'Number'], correctAnswer: 2 },
              { question: 'What does DOM stand for?', options: ['Data Object Model', 'Document Object Model', 'Digital Object Model', 'None'], correctAnswer: 1 },
              { question: 'What is hoisting in JavaScript?', options: ['Moving declarations to top', 'Lifting objects', 'Sorting arrays', 'None'], correctAnswer: 0 },
              { question: 'What is the difference between let and var?', options: ['No difference', 'Scope', 'Type', 'Speed'], correctAnswer: 1 }
            ]
          },
          {
            title: 'HTML & CSS Basics',
            questions: [
              { question: 'What does HTML stand for?', options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'None'], correctAnswer: 0 },
              { question: 'Which CSS property controls text size?', options: ['text-size', 'font-size', 'text-style', 'font-style'], correctAnswer: 1 },
              { question: 'What is flexbox used for?', options: ['Animations', 'Layout', 'Colors', 'Fonts'], correctAnswer: 1 },
              { question: 'Which HTML tag is for largest heading?', options: ['<h6>', '<h1>', '<head>', '<header>'], correctAnswer: 1 },
              { question: 'What is CSS Grid?', options: ['Image grid', 'Layout system', 'Color palette', 'Font family'], correctAnswer: 1 }
            ]
          },
          {
            title: 'React.js Quiz',
            questions: [
              { question: 'What is JSX?', options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'None'], correctAnswer: 0 },
              { question: 'What is a React Hook?', options: ['Function', 'Class', 'Component', 'Special function'], correctAnswer: 3 },
              { question: 'What does useState return?', options: ['Value', 'Array with value and setter', 'Object', 'Function'], correctAnswer: 1 },
              { question: 'What is useEffect used for?', options: ['Styling', 'Side effects', 'Routing', 'State'], correctAnswer: 1 },
              { question: 'What is a component?', options: ['Function or class', 'Variable', 'Loop', 'Condition'], correctAnswer: 0 }
            ]
          },
          {
            title: 'Node.js & Backend',
            questions: [
              { question: 'What is Node.js?', options: ['Framework', 'Runtime environment', 'Library', 'Database'], correctAnswer: 1 },
              { question: 'What is Express.js?', options: ['Database', 'Web framework', 'Testing tool', 'CSS framework'], correctAnswer: 1 },
              { question: 'What is middleware?', options: ['Database', 'Function in request pipeline', 'Frontend tool', 'None'], correctAnswer: 1 },
              { question: 'What is REST API?', options: ['Database', 'Architectural style', 'Programming language', 'Framework'], correctAnswer: 1 },
              { question: 'What is npm?', options: ['Node package manager', 'New programming method', 'Network protocol', 'None'], correctAnswer: 0 }
            ]
          }
        ],
        assignments: [
          { title: 'Build a Todo App', description: 'Create a React todo application', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Full Stack Developer', 'Frontend Developer', 'Web Developer']
      },
      {
        name: 'Database Management Systems',
        fieldOfStudy: 'Computer Science',
        description: 'Learn SQL, NoSQL, and database design principles',
        roadmap: [
          { phase: '1', title: 'Database Fundamentals', description: 'DBMS concepts and architecture', duration: '2 weeks' },
          { phase: '2', title: 'SQL Mastery', description: 'Queries, joins, and optimization', duration: '3 weeks' },
          { phase: '3', title: 'NoSQL Databases', description: 'MongoDB, Redis, Cassandra', duration: '3 weeks' },
          { phase: '4', title: 'Database Design', description: 'Normalization and indexing', duration: '2 weeks' }
        ],
        videos: [
          { title: 'Introduction to Databases', url: 'https://www.youtube.com/embed/wR0jg0eQsZA', duration: '20:00', description: 'DBMS fundamentals' },
          { title: 'Relational Model', url: 'https://www.youtube.com/embed/OqjJjpjDRLc', duration: '22:30', description: 'Tables and relationships' },
          { title: 'SQL Basics', url: 'https://www.youtube.com/embed/HXV3zeQKqGY', duration: '25:15', description: 'SELECT, INSERT, UPDATE, DELETE' },
          { title: 'SQL Joins', url: 'https://www.youtube.com/embed/9yeOJ0ZMUYw', duration: '28:40', description: 'INNER, LEFT, RIGHT, FULL joins' },
          { title: 'Aggregate Functions', url: 'https://www.youtube.com/embed/7S_tz1z_5bA', duration: '18:20', description: 'COUNT, SUM, AVG, GROUP BY' },
          { title: 'Database Normalization', url: 'https://www.youtube.com/embed/GFQaEYEc8_8', duration: '24:30', description: '1NF, 2NF, 3NF, BCNF' },
          { title: 'Indexing Strategies', url: 'https://www.youtube.com/embed/fsG1XaZEa78', duration: '26:15', description: 'B-trees and performance' },
          { title: 'Transactions and ACID', url: 'https://www.youtube.com/embed/pomxJOFVcQs', duration: '23:45', description: 'Data consistency' },
          { title: 'MongoDB Introduction', url: 'https://www.youtube.com/embed/ofme2o29ngU', duration: '27:20', description: 'NoSQL document database' }
        ],
        quizzes: [
          {
            title: 'SQL Fundamentals',
            questions: [
              { question: 'What does SQL stand for?', options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'None'], correctAnswer: 0 },
              { question: 'Which command retrieves data?', options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'], correctAnswer: 1 },
              { question: 'What is a primary key?', options: ['First column', 'Unique identifier', 'Foreign key', 'Index'], correctAnswer: 1 },
              { question: 'What does JOIN do?', options: ['Combines tables', 'Splits tables', 'Deletes data', 'Updates data'], correctAnswer: 0 },
              { question: 'What is normalization?', options: ['Data backup', 'Reducing redundancy', 'Indexing', 'Encryption'], correctAnswer: 1 }
            ]
          },
          {
            title: 'NoSQL Databases',
            questions: [
              { question: 'What type of database is MongoDB?', options: ['Relational', 'Document', 'Graph', 'Key-value'], correctAnswer: 1 },
              { question: 'What is a collection in MongoDB?', options: ['Table equivalent', 'Database', 'Row', 'Column'], correctAnswer: 0 },
              { question: 'What is Redis used for?', options: ['Caching', 'File storage', 'Email', 'Graphics'], correctAnswer: 0 },
              { question: 'What is CAP theorem?', options: ['Database theory', 'Programming concept', 'Network protocol', 'None'], correctAnswer: 0 },
              { question: 'What is sharding?', options: ['Backup', 'Horizontal partitioning', 'Encryption', 'Indexing'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Design E-commerce Database', description: 'Create normalized schema for online store', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Database Administrator', 'Data Engineer', 'Backend Developer']
      },
      {
        name: 'Operating Systems',
        fieldOfStudy: 'Computer Science',
        description: 'Understanding OS concepts, processes, and memory management',
        roadmap: [
          { phase: '1', title: 'OS Fundamentals', description: 'Introduction to operating systems', duration: '2 weeks' },
          { phase: '2', title: 'Process Management', description: 'Scheduling and synchronization', duration: '3 weeks' },
          { phase: '3', title: 'Memory Management', description: 'Virtual memory and paging', duration: '3 weeks' },
          { phase: '4', title: 'File Systems', description: 'Storage and I/O management', duration: '2 weeks' }
        ],
        videos: [
          { title: 'Introduction to OS', url: 'https://www.youtube.com/embed/26QPDBe-NB8', duration: '22:00', description: 'OS overview and types' },
          { title: 'Process vs Thread', url: 'https://www.youtube.com/embed/exbKr6fnoUw', duration: '19:30', description: 'Concurrency basics' },
          { title: 'CPU Scheduling', url: 'https://www.youtube.com/embed/EWkQl0n0w5M', duration: '26:45', description: 'FCFS, SJF, Round Robin' },
          { title: 'Deadlocks', url: 'https://www.youtube.com/embed/UVo9mGARkhQ', duration: '24:20', description: 'Prevention and avoidance' },
          { title: 'Memory Management', url: 'https://www.youtube.com/embed/qdkxXygc3rE', duration: '28:15', description: 'Paging and segmentation' },
          { title: 'Virtual Memory', url: 'https://www.youtube.com/embed/2quKyPnUShQ', duration: '25:50', description: 'Page replacement algorithms' },
          { title: 'File Systems', url: 'https://www.youtube.com/embed/KN8YgJnShPM', duration: '23:40', description: 'FAT, NTFS, ext4' },
          { title: 'Disk Scheduling', url: 'https://www.youtube.com/embed/jSRsOHZ4PMo', duration: '20:30', description: 'FCFS, SSTF, SCAN' }
        ],
        quizzes: [
          {
            title: 'OS Basics',
            questions: [
              { question: 'What is an operating system?', options: ['Application', 'System software', 'Hardware', 'Network'], correctAnswer: 1 },
              { question: 'What is a process?', options: ['Program', 'Program in execution', 'Thread', 'Function'], correctAnswer: 1 },
              { question: 'What is context switching?', options: ['Changing programs', 'Switching between processes', 'Booting', 'Shutdown'], correctAnswer: 1 },
              { question: 'What is a deadlock?', options: ['System crash', 'Processes waiting indefinitely', 'Memory leak', 'CPU overload'], correctAnswer: 1 },
              { question: 'What is virtual memory?', options: ['RAM', 'Disk space as memory', 'Cache', 'ROM'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Implement Scheduling Algorithm', description: 'Code Round Robin scheduler', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Systems Engineer', 'DevOps Engineer', 'Kernel Developer']
      },
      {
        name: 'Computer Networks',
        fieldOfStudy: 'Computer Science',
        description: 'Learn networking protocols, TCP/IP, and network security',
        roadmap: [
          { phase: '1', title: 'Network Basics', description: 'OSI model and protocols', duration: '2 weeks' },
          { phase: '2', title: 'TCP/IP Stack', description: 'Internet protocols', duration: '3 weeks' },
          { phase: '3', title: 'Network Security', description: 'Encryption and firewalls', duration: '3 weeks' },
          { phase: '4', title: 'Wireless Networks', description: 'WiFi and mobile networks', duration: '2 weeks' }
        ],
        videos: [
          { title: 'Introduction to Networks', url: 'https://www.youtube.com/embed/3QhU9jd03a0', duration: '21:00', description: 'Network fundamentals' },
          { title: 'OSI Model', url: 'https://www.youtube.com/embed/vv4y_uOneC0', duration: '24:30', description: '7 layers explained' },
          { title: 'TCP vs UDP', url: 'https://www.youtube.com/embed/uwoD5YsGACg', duration: '18:45', description: 'Transport protocols' },
          { title: 'IP Addressing', url: 'https://www.youtube.com/embed/ddM9AcreVqY', duration: '22:20', description: 'IPv4 and IPv6' },
          { title: 'Subnetting', url: 'https://www.youtube.com/embed/ecCuyq-Wprc', duration: '26:15', description: 'Network division' },
          { title: 'DNS Explained', url: 'https://www.youtube.com/embed/mpQZVYPuDGU', duration: '19:30', description: 'Domain name system' },
          { title: 'HTTP/HTTPS', url: 'https://www.youtube.com/embed/iYM2zFP3Zn0', duration: '23:50', description: 'Web protocols' },
          { title: 'Network Security', url: 'https://www.youtube.com/embed/E03gh1huvW4', duration: '27:10', description: 'Firewalls and VPNs' }
        ],
        quizzes: [
          {
            title: 'Networking Fundamentals',
            questions: [
              { question: 'How many layers in OSI model?', options: ['5', '6', '7', '8'], correctAnswer: 2 },
              { question: 'What layer is TCP?', options: ['Network', 'Transport', 'Application', 'Physical'], correctAnswer: 1 },
              { question: 'What is IP address?', options: ['MAC address', 'Network identifier', 'Port number', 'Protocol'], correctAnswer: 1 },
              { question: 'What port does HTTP use?', options: ['21', '22', '80', '443'], correctAnswer: 2 },
              { question: 'What is DNS?', options: ['Security protocol', 'Name resolution', 'Routing protocol', 'Encryption'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Network Packet Analysis', description: 'Analyze network traffic using Wireshark', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Network Engineer', 'Security Engineer', 'Cloud Architect']
      },
      // Data Science - 4 subjects
      {
        name: 'Machine Learning Basics',
        fieldOfStudy: 'Data Science',
        description: 'Introduction to machine learning algorithms and applications',
        roadmap: [
          { phase: '1', title: 'Python for ML', description: 'Programming fundamentals', duration: '2 weeks' },
          { phase: '2', title: 'Statistics & Probability', description: 'Mathematical foundations', duration: '3 weeks' },
          { phase: '3', title: 'Supervised Learning', description: 'Classification & regression', duration: '4 weeks' },
          { phase: '4', title: 'Neural Networks', description: 'Deep learning intro', duration: '4 weeks' }
        ],
        videos: [
          { title: 'Python NumPy Tutorial', url: 'https://www.youtube.com/embed/QUT1VHiLmmI', duration: '25:30', description: 'NumPy basics and arrays' },
          { title: 'Pandas for Data Analysis', url: 'https://www.youtube.com/embed/vmEHCJofslg', duration: '28:20', description: 'DataFrames and operations' },
          { title: 'Data Visualization with Matplotlib', url: 'https://www.youtube.com/embed/3Xc3CA655Y4', duration: '22:45', description: 'Creating plots' },
          { title: 'Linear Regression Explained', url: 'https://www.youtube.com/embed/nk2CQITm_eo', duration: '28:45', description: 'First ML algorithm' },
          { title: 'Logistic Regression', url: 'https://www.youtube.com/embed/yIYKR4sgzI8', duration: '26:30', description: 'Classification algorithm' },
          { title: 'Decision Trees', url: 'https://www.youtube.com/embed/7VeUPuFGJHk', duration: '24:15', description: 'Tree-based models' },
          { title: 'Random Forests', url: 'https://www.youtube.com/embed/J4Wdy0Wc_xQ', duration: '27:50', description: 'Ensemble learning' },
          { title: 'K-Means Clustering', url: 'https://www.youtube.com/embed/4b5d3muPQmA', duration: '23:40', description: 'Unsupervised learning' },
          { title: 'Neural Networks 101', url: 'https://www.youtube.com/embed/aircAruvnKk', duration: '35:00', description: 'Introduction to neural nets' },
          { title: 'Convolutional Neural Networks', url: 'https://www.youtube.com/embed/YRhxdVk_sIs', duration: '32:15', description: 'CNNs for images' },
          { title: 'Recurrent Neural Networks', url: 'https://www.youtube.com/embed/AsNTP8Kwu80', duration: '30:45', description: 'RNNs for sequences' }
        ],
        quizzes: [
          {
            title: 'ML Fundamentals Quiz',
            questions: [
              { question: 'What is supervised learning?', options: ['Learning with labels', 'Learning without labels', 'Reinforcement', 'None'], correctAnswer: 0 },
              { question: 'Which is a classification algorithm?', options: ['Linear Regression', 'Logistic Regression', 'K-means', 'PCA'], correctAnswer: 1 },
              { question: 'What is overfitting?', options: ['Model too simple', 'Model too complex', 'Perfect model', 'None'], correctAnswer: 1 },
              { question: 'What is a training set?', options: ['Test data', 'Data to train model', 'Validation data', 'Production data'], correctAnswer: 1 },
              { question: 'What is cross-validation?', options: ['Testing method', 'Training method', 'Model evaluation technique', 'None'], correctAnswer: 2 }
            ]
          },
          {
            title: 'Deep Learning Basics',
            questions: [
              { question: 'What is a neural network?', options: ['Algorithm', 'Network of neurons', 'Database', 'Framework'], correctAnswer: 1 },
              { question: 'What is backpropagation?', options: ['Forward pass', 'Training algorithm', 'Activation function', 'Loss function'], correctAnswer: 1 },
              { question: 'What is an activation function?', options: ['Loss function', 'Non-linear function', 'Optimizer', 'None'], correctAnswer: 1 },
              { question: 'What is CNN used for?', options: ['Text', 'Images', 'Audio', 'All'], correctAnswer: 1 },
              { question: 'What is RNN used for?', options: ['Images', 'Sequential data', 'Tabular data', 'None'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Build a Linear Regression Model', description: 'Predict house prices using linear regression', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Data Scientist', 'ML Engineer', 'AI Researcher']
      },
      {
        name: 'Data Analysis with Python',
        fieldOfStudy: 'Data Science',
        description: 'Master data manipulation, visualization, and statistical analysis',
        roadmap: [
          { phase: '1', title: 'Python Basics', description: 'Programming fundamentals', duration: '2 weeks' },
          { phase: '2', title: 'NumPy & Pandas', description: 'Data manipulation libraries', duration: '3 weeks' },
          { phase: '3', title: 'Data Visualization', description: 'Matplotlib, Seaborn, Plotly', duration: '2 weeks' },
          { phase: '4', title: 'Statistical Analysis', description: 'Hypothesis testing and inference', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Python for Data Science', url: 'https://www.youtube.com/embed/_uQrJ0TkZlc', duration: '24:00', description: 'Python essentials' },
          { title: 'NumPy Arrays', url: 'https://www.youtube.com/embed/QUT1VHiLmmI', duration: '21:30', description: 'Array operations' },
          { title: 'Pandas DataFrames', url: 'https://www.youtube.com/embed/vmEHCJofslg', duration: '26:45', description: 'Data manipulation' },
          { title: 'Data Cleaning', url: 'https://www.youtube.com/embed/ZOX18HfLHGQ', duration: '23:20', description: 'Handling missing data' },
          { title: 'Exploratory Data Analysis', url: 'https://www.youtube.com/embed/xi0vhXFPegw', duration: '28:15', description: 'EDA techniques' },
          { title: 'Matplotlib Basics', url: 'https://www.youtube.com/embed/3Xc3CA655Y4', duration: '22:50', description: 'Creating plots' },
          { title: 'Seaborn Visualization', url: 'https://www.youtube.com/embed/6GUZXDef2U0', duration: '25:30', description: 'Statistical plots' },
          { title: 'Statistical Testing', url: 'https://www.youtube.com/embed/0oc49DyA3hU', duration: '27:40', description: 'Hypothesis testing' }
        ],
        quizzes: [
          {
            title: 'Python Data Analysis',
            questions: [
              { question: 'What is Pandas used for?', options: ['Gaming', 'Data manipulation', 'Web development', 'Graphics'], correctAnswer: 1 },
              { question: 'What is a DataFrame?', options: ['Array', '2D labeled data structure', 'List', 'Dictionary'], correctAnswer: 1 },
              { question: 'What does EDA stand for?', options: ['Easy Data Analysis', 'Exploratory Data Analysis', 'Extended Data Analysis', 'None'], correctAnswer: 1 },
              { question: 'What is matplotlib?', options: ['Database', 'Visualization library', 'ML library', 'Web framework'], correctAnswer: 1 },
              { question: 'What is a null hypothesis?', options: ['No data', 'Default assumption', 'Error', 'None'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Analyze Sales Data', description: 'Perform EDA on e-commerce dataset', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Data Analyst', 'Business Analyst', 'Data Scientist']
      },
      {
        name: 'Big Data Technologies',
        fieldOfStudy: 'Data Science',
        description: 'Learn Hadoop, Spark, and distributed computing',
        roadmap: [
          { phase: '1', title: 'Big Data Fundamentals', description: 'Introduction to big data', duration: '2 weeks' },
          { phase: '2', title: 'Hadoop Ecosystem', description: 'HDFS, MapReduce, Hive', duration: '3 weeks' },
          { phase: '3', title: 'Apache Spark', description: 'Distributed processing', duration: '4 weeks' },
          { phase: '4', title: 'Real-time Processing', description: 'Kafka and streaming', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Introduction to Big Data', url: 'https://example.com/bd1', duration: '23:00', description: 'Big data concepts' },
          { title: 'Hadoop Architecture', url: 'https://example.com/bd2', duration: '26:30', description: 'HDFS and MapReduce' },
          { title: 'Apache Spark Basics', url: 'https://example.com/bd3', duration: '28:45', description: 'RDDs and DataFrames' },
          { title: 'Spark SQL', url: 'https://example.com/bd4', duration: '25:20', description: 'Structured data processing' },
          { title: 'Spark Streaming', url: 'https://example.com/bd5', duration: '27:15', description: 'Real-time analytics' },
          { title: 'Apache Kafka', url: 'https://example.com/bd6', duration: '24:50', description: 'Message streaming' }
        ],
        quizzes: [
          {
            title: 'Big Data Basics',
            questions: [
              { question: 'What is Hadoop?', options: ['Database', 'Distributed framework', 'Programming language', 'None'], correctAnswer: 1 },
              { question: 'What is HDFS?', options: ['File system', 'Database', 'Framework', 'Language'], correctAnswer: 0 },
              { question: 'What is Spark?', options: ['Database', 'Processing engine', 'Storage', 'Network'], correctAnswer: 1 },
              { question: 'What is MapReduce?', options: ['Algorithm', 'Programming model', 'Database', 'None'], correctAnswer: 1 },
              { question: 'What is Kafka used for?', options: ['Storage', 'Streaming', 'Visualization', 'Testing'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Process Large Dataset', description: 'Use Spark to analyze big data', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Big Data Engineer', 'Data Engineer', 'Platform Engineer']
      },
      {
        name: 'Data Visualization',
        fieldOfStudy: 'Data Science',
        description: 'Create compelling visualizations and dashboards',
        roadmap: [
          { phase: '1', title: 'Visualization Principles', description: 'Design and best practices', duration: '2 weeks' },
          { phase: '2', title: 'Python Libraries', description: 'Matplotlib, Seaborn, Plotly', duration: '3 weeks' },
          { phase: '3', title: 'Interactive Dashboards', description: 'Tableau and Power BI', duration: '3 weeks' },
          { phase: '4', title: 'D3.js', description: 'Web-based visualizations', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Data Viz Principles', url: 'https://example.com/viz1', duration: '22:00', description: 'Design fundamentals' },
          { title: 'Matplotlib Advanced', url: 'https://example.com/viz2', duration: '25:30', description: 'Custom plots' },
          { title: 'Seaborn Statistical Plots', url: 'https://example.com/viz3', duration: '23:45', description: 'Statistical visualization' },
          { title: 'Plotly Interactive Charts', url: 'https://example.com/viz4', duration: '26:20', description: 'Interactive plots' },
          { title: 'Tableau Basics', url: 'https://example.com/viz5', duration: '28:15', description: 'Dashboard creation' },
          { title: 'Power BI Introduction', url: 'https://example.com/viz6', duration: '27:40', description: 'Business intelligence' }
        ],
        quizzes: [
          {
            title: 'Visualization Quiz',
            questions: [
              { question: 'What chart shows distribution?', options: ['Pie chart', 'Histogram', 'Line chart', 'Bar chart'], correctAnswer: 1 },
              { question: 'What is Tableau?', options: ['Database', 'Visualization tool', 'Programming language', 'Framework'], correctAnswer: 1 },
              { question: 'What is a heatmap?', options: ['Temperature map', 'Matrix visualization', 'Geographic map', 'None'], correctAnswer: 1 },
              { question: 'What is D3.js?', options: ['Database', 'JavaScript library', 'Python library', 'Framework'], correctAnswer: 1 },
              { question: 'What shows trends over time?', options: ['Pie chart', 'Bar chart', 'Line chart', 'Scatter plot'], correctAnswer: 2 }
            ]
          }
        ],
        assignments: [
          { title: 'Create Dashboard', description: 'Build interactive dashboard with Plotly', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Data Visualization Specialist', 'BI Analyst', 'Data Analyst']
      },
      // Business Management - 3 subjects
      {
        name: 'Strategic Management',
        fieldOfStudy: 'Business Management',
        description: 'Learn strategic planning and business decision-making',
        roadmap: [
          { phase: '1', title: 'Business Fundamentals', description: 'Core concepts', duration: '2 weeks' },
          { phase: '2', title: 'Market Analysis', description: 'Understanding markets', duration: '3 weeks' },
          { phase: '3', title: 'Strategic Planning', description: 'Long-term strategy', duration: '3 weeks' },
          { phase: '4', title: 'Execution & Control', description: 'Implementation', duration: '2 weeks' }
        ],
        videos: [
          { title: 'Introduction to Strategy', url: 'https://example.com/video10', duration: '20:00', description: 'Strategy basics' },
          { title: 'SWOT Analysis', url: 'https://example.com/video11', duration: '18:30', description: 'Strategic analysis tool' },
          { title: 'Competitive Advantage', url: 'https://example.com/video12', duration: '22:45', description: 'Building advantage' }
        ],
        quizzes: [
          {
            title: 'Strategy Basics Quiz',
            questions: [
              { question: 'What does SWOT stand for?', options: ['Strengths, Weaknesses, Opportunities, Threats', 'Strategy, Work, Operations, Tactics', 'Sales, Workforce, Operations, Technology', 'None'], correctAnswer: 0 },
              { question: 'What is a competitive advantage?', options: ['Lower prices', 'Unique value proposition', 'More employees', 'Bigger office'], correctAnswer: 1 },
              { question: 'What is market segmentation?', options: ['Dividing market into groups', 'Selling everything', 'Pricing strategy', 'None'], correctAnswer: 0 }
            ]
          }
        ],
        assignments: [
          { title: 'Create a Business Strategy', description: 'Develop a strategic plan for a startup', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Business Consultant', 'Strategy Manager', 'CEO']
      },
      {
        name: 'Cognitive Psychology',
        fieldOfStudy: 'Psychology',
        description: 'Understanding mental processes and human cognition',
        roadmap: [
          { phase: '1', title: 'Introduction to Cognition', description: 'Basic concepts', duration: '2 weeks' },
          { phase: '2', title: 'Memory & Learning', description: 'How we remember', duration: '3 weeks' },
          { phase: '3', title: 'Perception & Attention', description: 'Sensory processing', duration: '3 weeks' },
          { phase: '4', title: 'Problem Solving', description: 'Decision making', duration: '2 weeks' }
        ],
        videos: [
          { title: 'What is Cognitive Psychology?', url: 'https://example.com/video13', duration: '16:30', description: 'Field overview' },
          { title: 'Memory Systems', url: 'https://example.com/video14', duration: '24:15', description: 'Types of memory' },
          { title: 'Attention Mechanisms', url: 'https://example.com/video15', duration: '19:45', description: 'How attention works' }
        ],
        quizzes: [
          {
            title: 'Cognition Quiz',
            questions: [
              { question: 'What is working memory?', options: ['Long-term storage', 'Short-term active memory', 'Sensory memory', 'None'], correctAnswer: 1 },
              { question: 'What is selective attention?', options: ['Focusing on specific stimuli', 'Paying attention to everything', 'Memory recall', 'None'], correctAnswer: 0 },
              { question: 'What is cognitive load?', options: ['Physical weight', 'Mental effort required', 'Memory capacity', 'None'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Memory Experiment', description: 'Design and conduct a memory study', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Clinical Psychologist', 'Researcher', 'UX Researcher']
      },
      {
        name: 'Thermodynamics',
        fieldOfStudy: 'Mechanical Engineering',
        description: 'Study of energy, heat, and work in mechanical systems',
        roadmap: [
          { phase: '1', title: 'Basic Concepts', description: 'Temperature, heat, work', duration: '2 weeks' },
          { phase: '2', title: 'First Law', description: 'Energy conservation', duration: '3 weeks' },
          { phase: '3', title: 'Second Law', description: 'Entropy and efficiency', duration: '3 weeks' },
          { phase: '4', title: 'Applications', description: 'Engines and cycles', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Introduction to Thermodynamics', url: 'https://example.com/video16', duration: '22:00', description: 'Basic principles' },
          { title: 'First Law Explained', url: 'https://example.com/video17', duration: '26:30', description: 'Energy conservation' },
          { title: 'Heat Engines', url: 'https://example.com/video18', duration: '28:15', description: 'Practical applications' }
        ],
        quizzes: [
          {
            title: 'Thermodynamics Quiz',
            questions: [
              { question: 'What is the first law of thermodynamics?', options: ['Energy cannot be created or destroyed', 'Entropy increases', 'Heat flows to cold', 'None'], correctAnswer: 0 },
              { question: 'What is entropy?', options: ['Energy', 'Disorder measure', 'Temperature', 'Pressure'], correctAnswer: 1 },
              { question: 'What is an isothermal process?', options: ['Constant temperature', 'Constant pressure', 'Constant volume', 'None'], correctAnswer: 0 }
            ]
          }
        ],
        assignments: [
          { title: 'Heat Engine Analysis', description: 'Calculate efficiency of a Carnot engine', deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Mechanical Engineer', 'Energy Consultant', 'HVAC Engineer']
      },
      {
        name: 'Molecular Biology',
        fieldOfStudy: 'Biology',
        description: 'Understanding life at the molecular level',
        roadmap: [
          { phase: '1', title: 'Cell Structure', description: 'Basic cell biology', duration: '2 weeks' },
          { phase: '2', title: 'DNA & RNA', description: 'Genetic material', duration: '3 weeks' },
          { phase: '3', title: 'Protein Synthesis', description: 'Gene expression', duration: '3 weeks' },
          { phase: '4', title: 'Gene Regulation', description: 'Control mechanisms', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Cell Biology Basics', url: 'https://example.com/video19', duration: '20:30', description: 'Cell components' },
          { title: 'DNA Structure', url: 'https://example.com/video20', duration: '23:45', description: 'Double helix explained' },
          { title: 'Protein Synthesis', url: 'https://example.com/video21', duration: '27:00', description: 'From DNA to protein' }
        ],
        quizzes: [
          {
            title: 'Molecular Biology Quiz',
            questions: [
              { question: 'What is DNA?', options: ['Protein', 'Genetic material', 'Enzyme', 'Lipid'], correctAnswer: 1 },
              { question: 'What are the building blocks of proteins?', options: ['Nucleotides', 'Amino acids', 'Sugars', 'Lipids'], correctAnswer: 1 },
              { question: 'What is transcription?', options: ['DNA to RNA', 'RNA to protein', 'DNA replication', 'None'], correctAnswer: 0 }
            ]
          }
        ],
        assignments: [
          { title: 'Gene Expression Analysis', description: 'Analyze a gene expression pathway', deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Molecular Biologist', 'Geneticist', 'Biotech Researcher']
      },
      {
        name: 'Corporate Finance',
        fieldOfStudy: 'Finance',
        description: 'Financial management and investment decisions',
        roadmap: [
          { phase: '1', title: 'Financial Statements', description: 'Reading financials', duration: '2 weeks' },
          { phase: '2', title: 'Time Value of Money', description: 'Present and future value', duration: '2 weeks' },
          { phase: '3', title: 'Capital Budgeting', description: 'Investment decisions', duration: '3 weeks' },
          { phase: '4', title: 'Risk & Return', description: 'Portfolio management', duration: '3 weeks' }
        ],
        videos: [
          { title: 'Financial Statements Overview', url: 'https://example.com/video22', duration: '21:30', description: 'Balance sheet, income statement' },
          { title: 'Time Value of Money', url: 'https://example.com/video23', duration: '25:00', description: 'PV and FV calculations' },
          { title: 'NPV and IRR', url: 'https://example.com/video24', duration: '28:30', description: 'Investment analysis' }
        ],
        quizzes: [
          {
            title: 'Finance Fundamentals Quiz',
            questions: [
              { question: 'What is NPV?', options: ['Net Present Value', 'New Product Value', 'National Product Value', 'None'], correctAnswer: 0 },
              { question: 'What does ROI stand for?', options: ['Return on Investment', 'Rate of Interest', 'Risk of Investment', 'None'], correctAnswer: 0 },
              { question: 'What is diversification?', options: ['Buying one stock', 'Spreading investments', 'Selling assets', 'None'], correctAnswer: 1 }
            ]
          }
        ],
        assignments: [
          { title: 'Investment Analysis', description: 'Evaluate an investment opportunity using NPV', deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) }
        ],
        careerPaths: ['Financial Analyst', 'Investment Banker', 'CFO']
      }
    ];

    await Subject.insertMany(subjects);
    console.log('✅ Subjects seeded successfully');
    console.log(`📚 Total: ${subjects.length} subjects across 7 fields`);
    console.log('🎥 Each subject has 6-18 video lectures');
    console.log('📝 Each subject has 2-4 quizzes with 5 questions each');

    console.log('\n🎉 Seed completed!');
    console.log('\n📧 Demo Login:');
    console.log('Email: demo@neurobuddy.com');
    console.log('Password: Demo123!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed Error:', error);
    process.exit(1);
  }
};

seedData();
