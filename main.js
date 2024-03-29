document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = 'Not Paid';  
    var issue = {
      id: issueId,
      description: issueDesc,
      severity: issueSeverity,
      assignedTo: issueAssignedTo,
      status: issueStatus
    }
    
    if (localStorage.getItem('issues') === null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
      }
      
      document.getElementById('issueInputForm').reset();
     
      fetchIssues();
      
      e.preventDefault(); 
    }

function fetchIssues () {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');
    
    issuesList.innerHTML = '';
    
    for (var i = 0; i < issues.length; i++) {
      var id = issues[i].id;
      var desc = issues[i].description;
      var severity = issues[i].severity;
      var assignedTo = issues[i].assignedTo;
      var status = issues[i].status;
      
      issuesList.innerHTML +=   '<div class="well">'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<img src="img/img1.png" alt="" width="150" height="120" />'+
                                '<span <h1> -<<<.Make 30 % Deposit commitment Fee.>>>- </h1></span>'+
                                '<h6>Request ID: ' + id + '</h6>'+
                                '<p><span class="glyphicon glyphicon-time"></span> ' + severity + ' '+                              
                                '<span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>'+
                                '<a  class="btn " onclick="setStatusClosed(\''+id+'\')"></a> '+
                                '<a  class="btn " onclick="deleteIssue(\''+id+'\')"></a>'+
                                '</div>';
    }
  }

    
   
  function setStatusClosed (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues[i].status = "Deposit Confirmed.Thank You";
      }
    }
      
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }
  function deleteIssue (id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    
    for(var i = 0; i < issues.length; i++) {
      if (issues[i].id == id) {
        issues.splice(i, 1);
      }
    }
    
    localStorage.setItem('issues', JSON.stringify(issues));
    
    fetchIssues();
  }