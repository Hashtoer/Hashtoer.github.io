let classCount = 0;

function addClass() {
    classCount++;
    const classesContainer = document.getElementById('classesContainer');
    
    const classRow = document.createElement('div');
    classRow.className = 'class-row';
    classRow.id = `class-${classCount}`;
    
    classRow.innerHTML = `
        <input type="text" placeholder="e.g., AP Biology, Honors English, Algebra II" id="className-${classCount}">
        <input type="number" placeholder="85" min="0" max="100" id="grade-${classCount}">
        <select class="class-type-select" id="type-${classCount}">
            <option value="regular">Regular</option>
            <option value="honors">Honors (+5)</option>
            <option value="ap">AP (+10)</option>
        </select>
        <button class="remove-btn" onclick="removeClass(${classCount})">×</button>
    `;
    
    classesContainer.appendChild(classRow);
}

function removeClass(id) {
    const classRow = document.getElementById(`class-${id}`);
    if (classRow) {
        classRow.remove();
    }
}

function calculateGPA() {
    const classes = document.querySelectorAll('.class-row');
    
    if (classes.length === 0) {
        alert('Please add at least one class to calculate your GPA.');
        return;
    }

    let totalUnweighted = 0;
    let totalWeighted = 0;
    let validClasses = 0;

    classes.forEach(classRow => {
        const gradeInput = classRow.querySelector('input[type="number"]');
        const typeSelect = classRow.querySelector('select');
        
        const grade = parseFloat(gradeInput.value);
        const type = typeSelect.value;
        
        if (!isNaN(grade) && grade >= 0 && grade <= 100) {
            validClasses++;
            totalUnweighted += grade;
            
            let weightedGrade = grade;
            if (type === 'honors') {
                weightedGrade += 5;
            } else if (type === 'ap') {
                weightedGrade += 10;
            }
            
            // Cap weighted grade at 100
            weightedGrade = Math.min(weightedGrade, 100);
            totalWeighted += weightedGrade;
        }
    });

    if (validClasses === 0) {
        alert('Please enter valid grades (0-100) for your classes.');
        return;
    }

    const unweightedGPA = (totalUnweighted / validClasses).toFixed(2);
    const weightedGPA = (totalWeighted / validClasses).toFixed(2);

    document.getElementById('unweightedGPA').textContent = unweightedGPA;
    document.getElementById('weightedGPA').textContent = weightedGPA;
    document.getElementById('results').style.display = 'grid';

    // Scroll to results
    document.getElementById('results').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Add initial classes when page loads
document.addEventListener('DOMContentLoaded', function() {
    addClass();
    addClass();
    addClass();
});
