export default {
    toggleLike: function(id) {
        localStorage.setItem(`dome-like-house-${id}`, !this.isHouseLiked(id));
    },
    isHouseLiked: function(id) {
        return localStorage.getItem(`dome-like-house-${id}`) === 'true' ? true : false;
    },
    setDraftComment: function(draft) {
        localStorage.setItem(`dome-draft-comment`, draft);
    },
    getDraftComment: function() {
        return localStorage.getItem(`dome-draft-comment`) || '';
    }
};