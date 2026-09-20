package com.gn.agencies.repository;

import com.gn.agencies.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {
     @Query("SELECT f FROM Feedback f WHERE f.customer.name = :userName")
        List<Feedback> findFeedbackByCustomerName(@Param("userName") String userName);

}

