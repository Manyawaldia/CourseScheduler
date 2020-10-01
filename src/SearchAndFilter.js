class SearchAndFilter {
  searchAndFilter(courses, search, subject, minimumCredits, maximumCredits) {
    let filtered = [];
    for (let i = 0; i < courses.length; i++) {

      if (this.search(courses[i], search) &&
        this.subject(courses[i], subject) &&
        this.credits(courses[i], minimumCredits, maximumCredits)) {
        filtered.push(courses[i])
      }

    }
    return filtered;
  }

  search(course, search) {
    if (search === "") {
      return true;
    }
    else {
      let keywords = course.keywords;
      const words = (keyword) => keyword.includes(search.toLowerCase());
      if (keywords.some(words)) {
        return true;
      }
    }

    return false;
  }

  subject(course, subject) {
    if(subject === "All"){
      return true;
    }
    if (course.subject === subject) {
      return true;
    }
    return false;
  }

  credits(course, minimumCredits, maximumCredits) {
    if(minimumCredits === ""){
      minimumCredits = 0;
    }
    if(maximumCredits === ""){
      maximumCredits= Number.MAX_SAFE_INTEGER;
    }
    if (course.credits >= minimumCredits && course.credits <= maximumCredits) {
      return true;
    }
    return false;
  }


}

export default SearchAndFilter;
