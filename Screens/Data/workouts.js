const data = [
    {
      id: 1,
      name: 'Pull-ups',
      reps: '8 reps and 3 sets',
      image: require('../../assets/Workout1screen/Pullups.gif'),
    },
    {
      id: 2,
      name: 'Lat Pulldowns',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout1screen/LatPulldowns.gif'),
    },
    {
      id: 3,
      name: 'Dumbbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout1screen/DumbbellRows.gif'),
    },
    {
      id: 4,
      name: 'Barbell Rows',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout1screen/BarbellRows.gif'),
    },
    {
      id: 5,
      name: 'Hammer Curls',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout1screen/HammerCurls.gif'),
    },
    {
      id: 6,
      name: 'Alternating Dumbbell Curls',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout1screen/AlternatingDumbbellCurls.gif'),
    },
    {
      id: 7,
      name: 'Weighted Pull-Ups',
      reps: '10 reps 4 sets',
      image: require('../../assets/Workout2screens/weighted-pull-up.gif'),
    },
    {
      id: 8,
      name: 'Barbell Rows',
      reps: '15 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout2screens/barbell-row.gif'),
    },
    {
      id: 9,
      name: 'One-Arm Dumbbell Rows',
      reps: '15 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout2screens/one-arm-dumbbell-row.gif'),
    },
    {
      id: 10,
      name: 'Chin-Ups',
      reps: '15 reps and 4 sets, increase weight each set. Last set drop set',
      image: require('../../assets/Workout2screens/chin-ups.gif'),
    },
    {
      id: 11,
      name: 'T-Bar Rows',
      reps: '15 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout2screens/t-bar-row.gif'),
    },
    {
      id: 12,
      name: 'Concentration Curls',
      reps: '15 reps and 4 sets',
      image: require('../../assets/Workout2screens/concentration-curl.gif'),
    },
    {
      id: 13,
      name: 'Hammer Curls',
      reps: 'Drop set',
      image: require('../../assets/Workout2screens/hammer-curl.gif'),
    },
    {
      id: 14,
      name: 'Push-Ups',
      reps: '20 reps and 5 sets',
      image: require('../../assets/Workout3screens/pushup.gif'),
    },
    {
      id: 15,
      name: 'Dumbbell Chest Press',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout3screens/dumbbellChestPress.gif'),
    },
    {
      id: 16,
      name: 'Triceps Dips',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout3screens/tricepdips.gif'),
    },
    {
      id: 17,
      name: 'Triceps Kickbacks:',
      reps: '12 reps and 3 sets',
      image: require('../../assets/Workout3screens/tricepkickbacks.gif'),
    },
    {
      id: 18,
      name: 'Incline Dumbbell Press',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/InclineDumbbellPress.gif'),
    },
    {
      id: 19,
      name: 'Close-Grip Bench Press',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/CloseGripBenchPress.gif'),
    },
    {
      id: 20,
      name: 'Ring Push-Ups',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/RingPush-Ups.gif'),
    },
    {
      id: 21,
      name: 'Dumbbell Floor Press',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/DumbbellFloorPress.gif'),
    },
    {
      id: 22,
      name: 'Plyometric Push-Ups',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/PlyometricPushUps.gif'),
    },
    {
      id: 23,
      name: 'Cable Crossover',
      reps: '12 reps and 4 sets, increase weight each set',
      image: require('../../assets/Workout4screen/CableCrossover.gif'),
    },
    {
      id: 24,
      name: 'Weighted Dips',
      reps: '25 reps 4 sets no rest',
      image: require('../../assets/Workout4screen/WeightedDips.gif'),
    },
    {
      id: 25,
      name: 'Diamond Push-Ups',
      reps: '25 reps 4 sets no rest',
      image: require('../../assets/Workout4screen/DiamondPushUps.gif'),
    },
    {
      id: 26,
      name: 'Both Arms Dumbbell',
      reps: '25 reps 4 sets no rest',
      image: require('../../assets/Workout4screen/Botharmsdumbbell.gif'),
    },
    {
      id: 27,
      name: 'Bodyweight Squats',
      reps: '10 reps',
      image: require('../../assets/Workout5screen/BodyweightSquats.gif'),
    },
    {
      id: 28,
      name: 'Walking Lunges',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/WalkingLunges.gif'),
    },
    {
      id: 29,
      name: 'Glute Bridge',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/GluteBridge.gif'),
    },
    {
      id: 30,
      name: 'Dumbbell Shoulder Press',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/DumbbellShoulderPress.gif'),
    },
    {
      id: 31,
      name: 'Front Raises',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/FrontRaises.gif'),
    },
    {
      id: 32,
      name: 'Lateral Raises',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/LateralRaises.gif'),
    },
    {
      id: 33,
      name: 'Shoulder Shrugs',
      reps: '12 reps',
      image: require('../../assets/Workout5screen/ShoulderShrugs.gif'),
    },
    {
      id: 34,
      name: 'Barbell Squat with Chains',
      reps: '10 reps',
      image: require('../../assets/Workout6screen/BarbellSquatwithChains.gif'),
    },
    {
      id: 35,
      name: 'Bulgarian Split Squats',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/BulgarianSplitSquats.gif'),
    },
    {
      id: 36,
      name: 'Pistol Squats',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/PistolSquats.gif'),
    },
    {
      id: 37,
      name: 'Standing Barbell Overhead Press',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/StandingBarbellOverheadPress.gif'),
    },
    {
      id: 38,
      name: 'Handstand Push-ups',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/HandstandPushups.gif'),
    },
    {
      id: 39,
      name: 'Arnold Press',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/ArnoldPress.gif'),
    },
    {
      id: 40,
      name: 'Dumbbell Lateral Raises',
      reps: '12 reps',
      image: require('../../assets/Workout6screen/DumbbellLateralRaises.gif'),
    },
  ];
  
  
  

  var myWorkouts = []
var myMeasurements = []

export { data, myWorkouts, myMeasurements };

  