
var breadcrumb = document.getElementById("brdcrb");
var page = document.getElementById("dropdown");

/* create an "change" event for dropdown */
page.addEventListener("change", function () {
    /* get the selected option from the drop down */
    var currentPage = this.value;
    /* create li element */
    var li = document.createElement("li");
    /* set attribute */
    li.setAttribute("class", "breadcrumb-item");
    /* add active class */
    li.classList.add("active");
    li.setAttribute("aria-current", "page");
    li.innerText = currentPage;

    /* test page */
    document.getElementById("test").innerText = currentPage;
    /* append to ul */
    breadcrumb.appendChild(li);
    /* now get the previous element and remove "active" class and aria-current attribute*/
    var previousElmt = li.previousElementSibling;
    /* add Hyper link */
    previousElmt.innerHTML = "<a href='#'>" + previousElmt.innerText + "</a>"
    previousElmt.classList.remove("active");
    previousElmt.removeAttribute("aria-current");
    /* array to store siblings */
    var nxtsblinings = [];
    function sibling() {
        /* get nextsibling element */
        var nxtsiblingElmnt = this.nextElementSibling;
        /* store the sibling */
        nxtsblinings.push(nxtsiblingElmnt);

        /* loop to check all the next siblings */
        while (true) {
            /* if next sibling not available stop the loop */
            if (nxtsiblingElmnt.nextElementSibling == null) {
                break;
            }
            else {
                nxtsiblingElmnt = nxtsiblingElmnt.nextElementSibling;
                nxtsblinings.push(nxtsiblingElmnt);
            }
        }
        /* use for loop to remove next siblings */
        for (var i = 0; i < nxtsblinings.length; i++) {
            /* remove that element and it classes and attribute also*/
            nxtsblinings[i].removeAttribute("aria-current");
            nxtsblinings[i].classList.remove("active");
            nxtsblinings[i].removeAttribute("class");
            nxtsblinings[i].remove();
            nxtsblinings.shift();
        }


        /* now add "active class" and replace hyperlink to text */
        this.innerText = this.innerText;
        this.classList.add("active");
        this.setAttribute("aria-current", "page");
        /* test page */
        document.getElementById("test").innerText = this.innerText;
        /* remove the event listener */
        this.removeEventListener("click", sibling);
    }
    /* click event */
    previousElmt.addEventListener("click", sibling);
});