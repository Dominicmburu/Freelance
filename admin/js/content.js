$(document).ready(function () {
    // Sample data for announcements, help articles, and blogs/news
    let announcements = [
        { id: 'A001', title: 'Maintenance Update', date: '2024-09-01', content: 'Details about maintenance update.' },
        { id: 'A002', title: 'New Features Released', date: '2024-09-05', content: 'Information on new features.' }
    ];

    let helpArticles = [
        { id: 'H001', title: 'How to Reset Password', date: '2024-09-02', content: 'Steps to reset your password.' },
        { id: 'H002', title: 'Using the Dashboard', date: '2024-09-04', content: 'Guide on how to use the dashboard.' }
    ];

    let blogNews = [
        { id: 'B001', title: 'Welcome to Our New Blog!', date: '2024-09-01', content: 'Introduction to the blog.' },
        { id: 'B002', title: 'Upcoming Events', date: '2024-09-07', content: 'Details on upcoming events.' }
    ];

    // Render functions for each section
    function renderAnnouncements() {
        const announcementsBody = $('#announcements-body');
        announcementsBody.empty();
        announcements.forEach(announcement => {
            const row = `
                <tr>
                    <td>${announcement.id}</td>
                    <td>${announcement.title}</td>
                    <td>${announcement.date}</td>
                    <td class="action-buttons">
                        <i class="fa fa-edit edit-announcement" title="Edit" data-id="${announcement.id}"></i>
                        <i class="fa fa-trash delete-announcement" title="Delete" data-id="${announcement.id}"></i>
                    </td>
                </tr>
            `;
            announcementsBody.append(row);
        });
    }

    function renderHelpArticles() {
        const helpArticlesBody = $('#help-articles-body');
        helpArticlesBody.empty();
        helpArticles.forEach(article => {
            const row = `
                <tr>
                    <td>${article.id}</td>
                    <td>${article.title}</td>
                    <td>${article.date}</td>
                    <td class="action-buttons">
                        <i class="fa fa-edit edit-help" title="Edit" data-id="${article.id}"></i>
                        <i class="fa fa-trash delete-help" title="Delete" data-id="${article.id}"></i>
                    </td>
                </tr>
            `;
            helpArticlesBody.append(row);
        });
    }

    function renderBlogNews() {
        const blogNewsBody = $('#blog-news-body');
        blogNewsBody.empty();
        blogNews.forEach(blog => {
            const row = `
                <tr>
                    <td>${blog.id}</td>
                    <td>${blog.title}</td>
                    <td>${blog.date}</td>
                    <td class="action-buttons">
                        <i class="fa fa-edit edit-blog" title="Edit" data-id="${blog.id}"></i>
                        <i class="fa fa-trash delete-blog" title="Delete" data-id="${blog.id}"></i>
                    </td>
                </tr>
            `;
            blogNewsBody.append(row);
        });
    }

    // Delete functionality
    $(document).on('click', '.delete-announcement', function () {
        const id = $(this).data('id');
        announcements = announcements.filter(announcement => announcement.id !== id);
        renderAnnouncements();
    });

    $(document).on('click', '.delete-help', function () {
        const id = $(this).data('id');
        helpArticles = helpArticles.filter(article => article.id !== id);
        renderHelpArticles();
    });

    $(document).on('click', '.delete-blog', function () {
        const id = $(this).data('id');
        blogNews = blogNews.filter(blog => blog.id !== id);
        renderBlogNews();
    });

    // Edit functionality (Populate form with existing data)
    $(document).on('click', '.edit-announcement', function () {
        const id = $(this).data('id');
        const announcement = announcements.find(a => a.id === id);
        $('#announcement-title').val(announcement.title);
        $('#announcement-content').val(announcement.content);
        $('#createAnnouncementModal').modal('show');
    });

    $(document).on('click', '.edit-help', function () {
        const id = $(this).data('id');
        const article = helpArticles.find(h => h.id === id);
        $('#help-title').val(article.title);
        $('#help-content').val(article.content);
        $('#createHelpModal').modal('show');
    });

    $(document).on('click', '.edit-blog', function () {
        const id = $(this).data('id');
        const blog = blogNews.find(b => b.id === id);
        $('#blog-title').val(blog.title);
        $('#blog-content').val(blog.content);
        $('#createBlogModal').modal('show');
    });

    // Initialize the tables with data
    renderAnnouncements();
    renderHelpArticles();
    renderBlogNews();
});